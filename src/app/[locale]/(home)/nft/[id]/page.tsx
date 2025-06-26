import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products } from "@/datas/product-data";
import { TabsNFTDetails } from "@/components/tabs/tabsNftDetail";
import { getProductById } from "../../services/ServiceProduct";
import { GATEWAY_URL } from "@/constants/env";

interface NFTDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NFTDetailPage({ params }: NFTDetailPageProps) {
  const { id } = await params;
  const nftData = await getProductById(id);

  if (!nftData.success) return <div>Loading...</div>;

  console.log("nftData: ", nftData.product?.image);

  const product = nftData.product;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-6 mx-auto max-w-12xl">
      <Card className="bg-background border border-border">
        <CardHeader className="ml-6">
          <CardTitle className="text-3xl font-bold capitalize">{product.title}</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-5 gap-2">
          <div className="md:col-span-2">
            <img
              src={`${GATEWAY_URL}/${product.image}`}
              alt={product.title}
              className="w-full h-auto max-h-[110vh] object-contain rounded"
            />
          </div>

          {/* NFT Info and Tabs */}
          <div className="md:col-span-3 space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs uppercase text-gray-400">Owner</span>
                  <span className="font-medium">{product.owner}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs uppercase text-gray-400">
                    Minted On
                  </span>
                  <span className="font-medium">
                    {product.mintedOn ? new Date(product.mintedOn).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs uppercase text-gray-400">
                    Token ID
                  </span>
                  <span className="font-medium">{product.tokenId}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs uppercase text-gray-400">
                    Contract
                  </span>
                  <span className="font-medium">{product.contract}</span>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-xs uppercase text-gray-400">Price</span>
                <p className="text-lg font-semibold ">{product.price}</p>
              </div>

              <Button variant="secondary" className="mt-2 w-full">
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
