import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products } from "@/datas/product-data";
import { TabsNFTDetails } from "@/components/tabs/tabsNftDetail";

interface NFTDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NFTDetailPage({ params }: NFTDetailPageProps) {
  const { id } = await params;
  const nftData = products.find((prod) => prod.id === id);

  if (!nftData) return <div>Loading...</div>;

  return (
    <div className="p-6 mx-auto max-w-12xl">
      <Card className="bg-background border border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{nftData.title}</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-5 gap-6">
          {/* NFT Image */}
            <div
            className="md:col-span-2"
              style={{
                backgroundImage: `url(${nftData.image})`,
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
            <TabsNFTDetails />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
