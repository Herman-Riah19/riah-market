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

export const productsHome: Product[] = [
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

export const products: Product[] = [
  {
    id: "abcdd",
    title: "Abstract Art #1",
    creator: "Alice Doe",
    price: 2.5,
    image: "/asset/images/image_1.jpg",
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
    image: "/asset/images/image_2.jpg",
    profile: "/asset/profile/profile_2.png",
    description: "Surreal waves with a cyberpunk vibe.",
    tokenId: "2134",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-14"
  },
  {
    id: "abcdf",
    title: "Neon Dreams #3",
    creator: "Charlie Johnson",
    price: 4.1,
    image: "/asset/images/image_3.jpg",
    profile: "/asset/profile/profile_3.png",
    description: "Neon-inspired digital masterpiece",
    tokenId: "2134",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-14"
  },
  {
    id: "abcdi",
    title: "Futuristic Vision #4",
    creator: "Diana Lee",
    price: 5.0,
    image: "/asset/images/image_4.jpg",
    profile: "/asset/profile/profile_4.jpg",
    description: "Future-focused digital art",
    tokenId: "3333",
    contract: "0x123...789",
    owner: "0x123...456",
    mintedOn: "2025-06-10"
  },
  {
    id: "abcdj",
    title: "Cosmic Dreams #5",
    creator: "Erik Wright",
    price: 3.8,
    image: "/asset/images/image_5.jpg",
    profile: "/asset/profile/profile_1.png",
    description: "Space-inspired digital creation",
    tokenId: "2135",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-14"
  },
  {
    id: "abcdk",
    title: "Digital Sunset #6",
    creator: "Fiona Chen",
    price: 4.2,
    image: "/asset/images/image_6.jpg",
    profile: "/asset/profile/profile_2.png",
    description: "Beautiful digital sunset scene",
    tokenId: "2136",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-15"
  },
  {
    id: "abcdl",
    title: "Cyber World #7",
    creator: "George Kim",
    price: 3.9,
    image: "/asset/images/image_7.jpg",
    profile: "/asset/profile/profile_3.png",
    description: "Cyberpunk-inspired artwork",
    tokenId: "2137",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-15"
  },
  {
    id: "abcdm",
    title: "Digital Forest #8",
    creator: "Hannah Park",
    price: 4.5,
    image: "/asset/images/image_8.jpg",
    profile: "/asset/profile/profile_4.jpg",
    description: "Nature-inspired digital art",
    tokenId: "2138",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-15"
  },
  {
    id: "abcdn",
    title: "Urban Future #9",
    creator: "Ian Foster",
    price: 3.7,
    image: "/asset/images/image_9.jpg",
    profile: "/asset/profile/profile_1.png",
    description: "Urban landscape reimagined",
    tokenId: "2139",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-16"
  },
  {
    id: "abcdo",
    title: "Digital Ocean #10",
    creator: "Julia Nash",
    price: 4.3,
    image: "/asset/images/image_10.jpg",
    profile: "/asset/profile/profile_2.png",
    description: "Ocean-themed digital artwork",
    tokenId: "2140",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-16"
  },
  {
    id: "abcdp",
    title: "Pixel Dreams #11",
    creator: "Kevin Lee",
    price: 3.6,
    image: "/asset/images/image_11.jpg",
    profile: "/asset/profile/profile_3.png",
    description: "Pixel art masterpiece",
    tokenId: "2141",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-16"
  },
  {
    id: "abcdq",
    title: "Digital Space #12",
    creator: "Linda Wang",
    price: 4.7,
    image: "/asset/images/image_12.jpg",
    profile: "/asset/profile/profile_4.jpg",
    description: "Space-themed digital creation",
    tokenId: "2142",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-17"
  },
  {
    id: "abcdr",
    title: "Future City #13",
    creator: "Mike Chang",
    price: 3.4,
    image: "/asset/images/image_13.jpg",
    profile: "/asset/profile/profile_1.png",
    description: "Futuristic cityscape",
    tokenId: "2143",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-17"
  },
  {
    id: "abcds",
    title: "Digital Nature #14",
    creator: "Nina Patel",
    price: 4.9,
    image: "/asset/images/image_14.jpg",
    profile: "/asset/profile/profile_2.png",
    description: "Natural world digitized",
    tokenId: "2144",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-17"
  },
  {
    id: "abcdt",
    title: "Abstract Flow #15",
    creator: "Oscar Martinez",
    price: 3.5,
    image: "/asset/images/image_15.jpg",
    profile: "/asset/profile/profile_3.png",
    description: "Abstract flowing patterns",
    tokenId: "2145",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-18"
  },
  {
    id: "abcdu",
    title: "Digital Dawn #16",
    creator: "Patricia Liu",
    price: 4.6,
    image: "/asset/images/image_16.jpg",
    profile: "/asset/profile/profile_4.jpg",
    description: "Digital sunrise scene",
    tokenId: "2146",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-18"
  },
  {
    id: "abcdv",
    title: "Cyber Dreams #17",
    creator: "Quinn Wilson",
    price: 3.3,
    image: "/asset/images/image_17.jpg",
    profile: "/asset/profile/profile_1.png",
    description: "Cyberpunk dreamscape",
    tokenId: "2147",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-18"
  },
  {
    id: "abcdw",
    title: "Digital Mountain #18",
    creator: "Rachel Kim",
    price: 4.4,
    image: "/asset/images/image_18.jpg",
    profile: "/asset/profile/profile_2.png",
    description: "Mountain landscape in digital form",
    tokenId: "2148",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-19"
  },
  {
    id: "abcdx",
    title: "Urban Dreams #19",
    creator: "Steve Johnson",
    price: 3.1,
    image: "/asset/images/image_19.jpg",
    profile: "/asset/profile/profile_3.png",
    description: "Urban-inspired digital art",
    tokenId: "2149",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-19"
  },
  {
    id: "abcdy",
    title: "Digital Universe #20",
    creator: "Tina Zhang",
    price: 4.8,
    image: "/asset/images/image_20.jpg",
    profile: "/asset/profile/profile_4.jpg",
    description: "Universe-themed digital piece",
    tokenId: "2150",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-19"
  },
  {
    id: "abcdz",
    title: "Future Dreams #21",
    creator: "Uma Clark",
    price: 3.9,
    image: "/asset/images/image_21.jpg",
    profile: "/asset/profile/profile_1.png",
    description: "Futuristic dreamscape creation",
    tokenId: "2151",
    contract: "0xabc...def",
    owner: "0x123...456",
    mintedOn: "2025-06-20"
  }
];
