"use client";
import { CardProduct } from "@/components/card/cardProduct";
import { products } from "@/datas/product-data";
import * as React from "react";

export function ListProductContent() {
  return (
    <section className="m-8">
      <h3 className="text-2xl font-bold mb-4">Live auction</h3>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((prod, index) => (
          <div key={index}>
            <CardProduct
              id={prod.id}
              title={prod.title}
              creator={prod.creator}
              price={prod.price}
              image={prod.image}
              profile={prod.profile}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
