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
import { Product } from "@/data/product-data";

export const CardProduct: React.FC<Product> = ({
  id,
  title,
  price,
  image,
  mintedOn,
  tokenId,
}) => {
  const local = useLocale();
  return (
    <Link href={`/${local}/nft/${id}`}>
      <Card className="p-0 overflow-hidden gap-1">
        <CardHeader className="h-[60vh] w-full m-0 p-0 relative">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-none object-cover object-top translate-y-0"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </CardHeader>
        <CardContent className="p-0 m-0">
          <CardTitle className="p-2 m-0">{title}</CardTitle>
        </CardContent>
        <CardFooter className="p-2 m-0 flex flex-row justify-between">
          <div className="flex flex-col text-center">
            <h4 className="text-md font-normal">Minted on</h4>
            <h3 className="text-lg font-bold text-primary">{mintedOn}</h3>
          </div>
          <div className="flex flex-col text-center">
            <h4 className="text-md font-normal">Token ID</h4>
            <h3 className="text-lg font-bold text-primary">{tokenId}</h3>
          </div>
          <div className="flex flex-col text-center">
            <h5 className="text-md font-normal">price</h5>
            <h3 className="text-lg font-bold text-primary">{price}</h3>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
