"use client";
import { CardProduct } from "@/components/card/cardProduct";
import { products } from "@/datas/product-data";
import * as React from "react";
import { SearchInput } from "../components/searchInput";

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchInput
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
        placeholder="Search NFTs"
      />
      <section className="m-8">
        <h3 className="text-2xl font-bold mb-4">Live auction</h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((prod, index) => (
            <div key={index}>
              <CardProduct
                id={prod.id}
                title={prod.title}
                image={prod.image}
                price={prod.price}
                mintedOn={prod.mintedOn}
                tokenId={prod.tokenId}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
