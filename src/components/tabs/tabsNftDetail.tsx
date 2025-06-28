"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
export function TabsNFTDetails() {
  return (
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

      <TabsContent value="orders" className="mt-4 text-muted-foreground">
        No active orders.
      </TabsContent>

      <TabsContent value="activity" className="mt-4 text-muted-foreground">
        No recent activity.
      </TabsContent>
    </Tabs>
  );
}
