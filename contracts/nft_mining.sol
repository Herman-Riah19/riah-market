// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    struct Product {
        string title;
        string image;
        string description;
        address creator;
        address owner;
        uint256 price;
        uint256 mintedOn;
        string profile; // Added profile field
    }

    // tokenId => Product
    mapping(uint256 => Product) private _products;

    struct Sale {
        address seller;
        uint256 price;
        bool isForSale;
    }
    mapping(uint256 => Sale) public sales;

    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {}

    function mintNFT(
        address recipient,
        string memory tokenURI,
        string memory title,
        string memory image,
        string memory description,
        uint256 price,
        string memory profile // Added profile param
    ) public onlyOwner {
        uint256 newTokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        _products[newTokenId] = Product({
            title: title,
            image: image,
            description: description,
            creator: msg.sender,
            owner: recipient,
            price: price,
            mintedOn: block.timestamp,
            profile: profile
        });
    }

    // Put NFT for sale
    function putForSale(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(price > 0, "Price must be positive");
        sales[tokenId] = Sale(msg.sender, price, true);
        _products[tokenId].price = price;
    }

    // Remove NFT from sale
    function removeFromSale(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        sales[tokenId].isForSale = false;
    }

    // Buy NFT
    function buyNFT(uint256 tokenId) public payable {
        Sale memory sale = sales[tokenId];
        require(sale.isForSale, "NFT not for sale");
        require(msg.value >= sale.price, "Insufficient funds");
        require(sale.seller != msg.sender, "Cannot buy your own NFT");

        // Transfer funds to seller
        payable(sale.seller).transfer(sale.price);

        // Transfer NFT to buyer
        _transfer(sale.seller, msg.sender, tokenId);

        // Update product owner
        _products[tokenId].owner = msg.sender;

        // Remove from sale
        sales[tokenId].isForSale = false;

        // Refund excess funds
        if (msg.value > sale.price) {
            payable(msg.sender).transfer(msg.value - sale.price);
        }
    }

    // Get Product info for a tokenId
    function getProduct(uint256 tokenId) public view returns (
        string memory id,
        string memory title,
        string memory creator,
        uint256 price,
        string memory image,
        string memory profile,
        string memory description,
        string memory tokenIdStr,
        string memory contractAddr,
        string memory owner,
        string memory mintedOn
    ) {
        Product memory p = _products[tokenId];
        id = Strings.toString(tokenId);
        title = p.title;
        creator = addressToString(p.creator);
        price = p.price;
        image = p.image;
        profile = p.profile;
        description = p.description;
        tokenIdStr = Strings.toString(tokenId);
        contractAddr = addressToString(address(this));
        owner = addressToString(p.owner);
        mintedOn = Strings.toString(p.mintedOn);
    }

    // Helper to convert address to string
    function addressToString(address _addr) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3+i*2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }
}
