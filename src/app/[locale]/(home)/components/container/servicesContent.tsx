"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    title: "Generate NFT Art with AI",
    description:
      "Create unique NFT artwork using advanced AI tools. Customize styles, colors, and more to make your NFT stand out.",
  },
  {
    title: "Mint Your NFT",
    description:
      "Easily mint your generated art as an NFT on the blockchain. Secure, fast, and user-friendly minting process.",
  },
  {
    title: "List NFT for Sale",
    description:
      "List your NFT on popular marketplaces directly from our platform. Set your price and manage your listings with ease.",
  },
];

export function ServiceContents() {
  return (
    <section className="bg-muted p-8 m-6 grid grid-cols-3 gap-8">
      <h2 className="col-span-3 text-3xl font-bold mb-6">Our Services</h2>
      {services.map((service, idx) => (
        <Card key={idx} className="p-4 hover:shadow-lg transition-shadow">
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl font-bold">
              {service.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <CardDescription className="text-lg">
              {service.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
