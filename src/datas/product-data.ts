export interface Product {
  id?: string;
  title: string;
  creator?: string;
  price: number;
  image: string;
  profile?: string;

  // Champs supplémentaires
  description?: string;
  tokenId?: string;
  contract?: string;
  owner?: string;
  mintedOn?: string;
}

export const products: Product[] = [
  {
    id: "abcdd",
    title: "Abstract Art #1",
    creator: "Alice Doe",
    price: 2.5,
    image: "/asset/images/image_2.jpg",
    profile: "/asset/profile/profile_1.png",
    description: "A stunning abstract digital piece.",
    tokenId: "2134",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-14",
  },
  {
    id: "abcde",
    title: "Digital Wave #2",
    creator: "Bob Smith",
    price: 3.2,
    image: "/asset/images/image_3.jpg",
    profile: "/asset/profile/profile_2.png",
    description: "Surreal waves with a cyberpunk vibe.",
    tokenId: "2134",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-14"
  },
  {
    id: "abcdf",
    title: "Neon Dreams #1",
    creator: "Charlie Johnson",
    price: 4.1,
    image: "/asset/images/image_4.jpg",
    profile: "/asset/profile/profile_3.png",
    tokenId: "2134",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-14"
  },
  {
    id: "abcdi",
    title: "Futuristic Vision #1",
    creator: "Diana Lee",
    price: 5.0,
    image: "/asset/images/image_5.jpg",
    profile: "/asset/profile/profile_4.jpg",
    tokenId: "3333",
    contract: "0x123...789",
    owner: "0x123...456",
    mintedOn: "2025-06-10"
  }
];
