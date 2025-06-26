"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Product } from "@/data/product-data";


export const CardNftIntro: React.FC<Product> = ({
  id,
  title,
  price,
  image,
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
          <div className="flex flex-col text-center">
            <h5 className="text-md font-normal">price</h5>
            <h3 className="text-lg font-bold">{price}</h3>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
