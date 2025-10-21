"use client"
import { CardProduct } from "@/components/card/cardProduct";
import * as React from "react";
import { Product } from "@prisma/client";
import { GATEWAY_URL } from "@/constants/env";

export function ListProductContent({ products }: { products?: Product[] }) {
  return (
    <section className="m-8">
      <h3 className="text-2xl font-bold mb-4">Live auction</h3>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products?.map((prod, index) => (
          <div key={index}>
            <CardProduct
              id={prod.id}
              title={prod.title}
              price={prod.price}
              image={`${prod.image}`}
              mintedOn={
                prod.mintedOn
                  ? new Date(prod.mintedOn).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : undefined
              }
              tokenId={prod.tokenId ?? undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
