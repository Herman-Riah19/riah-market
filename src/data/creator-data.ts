export interface Creator {
  name: string;
  value: number;
  image: string;
  rank?: number;
}

export const creators: Creator[] = [
    {
      name: "Alice Doe",
      value: 12.4,
      image: "/asset/profile/profile_1.png",
    },
    {
      name: "Bob Smith",
      value: 9.8,
      image: "/asset/profile/profile_2.png",
    },
    {
      name: "Charlie Johnson",
      value: 15.2,
      image: "/asset/profile/profile_3.png",
    },
    {
      name: "Diana Lee",
      value: 11.6,
      image: "/asset/profile/profile_4.jpg",
    },
  ];  