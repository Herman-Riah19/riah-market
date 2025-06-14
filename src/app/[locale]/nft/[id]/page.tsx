"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";

const traits = [
  {
    name: "BACKGROUND",
    value: "1-2",
    percent: "49%",
    count: 4857,
    floor: "0.0088 ETH",
  },
  {
    name: "FEMALE EYES",
    value: "w27",
    percent: "2%",
    count: 175,
    floor: "0.0089 ETH",
  },
  {
    name: "FEMALE HAIRS",
    value: "w27",
    percent: "3%",
    count: 254,
    floor: "0.0125 ETH",
  },
  {
    name: "FEMALE LIPS",
    value: "red",
    percent: "12%",
    count: 1132,
    floor: "0.006 ETH",
  },
  {
    name: "FEMALE SKIN",
    value: "brown",
    percent: "5%",
    count: 320,
    floor: "0.010 ETH",
  },
];

interface NFTDetailPageProps {
  params: { id: string };
}

export default function NFTDetailPage({ params }: NFTDetailPageProps) {
  const { id } = params;
  const [nftData, setNftData] = useState<any>(null);

  useEffect(() => {
    setNftData({
      title: "NFT Title",
      owner: "0xABC123...DEF",
      mintedOn: "2024-01-01",
      tokenId: "#1024",
      contract: "ERC-721",
      price: "0.5 ETH",
    });
  }, [id]);

  if (!nftData) return <div>Loading...</div>;

  return (
    <div className="p-6 mx-auto max-w-12xl">
      <Card className="bg-background border border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{nftData.title}</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-4 gap-6">
          {/* NFT Image */}
            <div
            className="md:col-span-1"
              style={{
                backgroundImage: `url(/asset/images/image_3.jpg)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />

          {/* NFT Info and Tabs */}
          <div className="md:col-span-3 space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs uppercase text-gray-400">Owner</span>
                  <span className="font-medium">{nftData.owner}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs uppercase text-gray-400">
                    Minted On
                  </span>
                  <span className="font-medium">{nftData.mintedOn}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs uppercase text-gray-400">
                    Token ID
                  </span>
                  <span className="font-medium">{nftData.tokenId}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs uppercase text-gray-400">
                    Contract
                  </span>
                  <span className="font-medium">{nftData.contract}</span>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-xs uppercase text-gray-400">Price</span>
                <p className="text-lg font-semibold ">{nftData.price}</p>
              </div>

              <Button className="mt-2 w-full bg-[#1c1c1e] hover:bg-[#333]">
                Make Offer
              </Button>
            </div>

            {/* Tabs for Details / Orders / Activity */}
            <Tabs defaultValue="details" className="w-full pt-4">
              <TabsList className="w-full flex justify-start gap-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {traits.map((trait, i) => (
                    <Card
                      key={i}
                      className="bg-muted/30 border border-muted rounded-lg px-4 py-3 text-sm"
                    >
                      <div className="text-xs text-muted-foreground uppercase font-semibold">
                        {trait.name}
                      </div>
                      <div className="text-base font-bold text-foreground">
                        {trait.value}
                      </div>
                      <div className="text-muted-foreground text-xs mt-1">
                        {trait.count} ({trait.percent})
                      </div>
                      <div className="text-xs mt-1">
                        Floor:{" "}
                        <span className="text-foreground font-medium">
                          {trait.floor}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="orders"
                className="mt-4 text-muted-foreground"
              >
                No active orders.
              </TabsContent>

              <TabsContent
                value="activity"
                className="mt-4 text-muted-foreground"
              >
                No recent activity.
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
