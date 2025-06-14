"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Product } from "@/datas/product-data";


export const CardProduct: React.FC<Product> = ({
  id,
  title,
  creator,
  price,
  image,
  profile,
}) => {
  const local = useLocale();
  return (
    <Link href={`/${local}/nft/${id}`}>
      <Card>
        <CardHeader
          className="h-[35vh] w-[20vw] m-3"
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
        <CardContent>
          <CardTitle>{title}</CardTitle>
        </CardContent>
        <CardFooter className="flex flex-row justify-between w-[20vw]">
          <Image
            className="rounded-full dark:invert"
            src={profile}
            alt={creator}
            width={50}
            height={50}
          />
          <div className="flex flex-col text-center">
            <h4 className="text-md font-normal">Creator</h4>
            <h3 className="text-lg font-bold">{creator}</h3>
          </div>
          <div className="flex flex-col text-center">
            <h5 className="text-md font-normal">price</h5>
            <h3 className="text-lg font-bold">{price}</h3>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
