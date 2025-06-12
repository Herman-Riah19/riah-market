pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    struct Sale {
        address seller;
        uint256 price;
        bool isForSale;
    }

    // Mapping from tokenId to sale info
    mapping(uint256 => Sale) public sales;

    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {}

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner {
        uint256 newTokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
    }

    // Put NFT for sale
    function putForSale(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(price > 0, "Price must be positive");
        sales[tokenId] = Sale(msg.sender, price, true);
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

        // Remove from sale
        sales[tokenId].isForSale = false;

        // Refund excess funds
        if (msg.value > sale.price) {
            payable(msg.sender).transfer(msg.value - sale.price);
        }
    }
}
