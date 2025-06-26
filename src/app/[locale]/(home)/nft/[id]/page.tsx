import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsNFTDetails } from "@/components/tabs/tabsNftDetail";
import { getProductById } from "@/services/serviceProduct";
import { GATEWAY_URL } from "@/constants/env";
import { getUserByAddressAction } from "@/services/serviceUser";

interface NFTDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NFTDetailPage({ params }: NFTDetailPageProps) {
  const { id } = await params;
  const nftData = await getProductById(id);

  if (!nftData.success) return <div>Loading...</div>;

  const product = nftData.product;
  if (!product) return <div>Product not found</div>;

  if (!product.owner) return <div>Owner address not available</div>;

  const owner = await getUserByAddressAction(product.owner);
  if (!owner.success) return <div>Error fetching owner information</div>;

  if (!owner.user) return <div>Owner not found</div>;
  const user = owner.user;

  return (
    <div className="p-6 mx-auto max-w-12xl min-h-screen">
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
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs uppercase text-gray-400">Owner</span>
                  <span className="font-medium">{user.name}</span>
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
                    Price
                  </span>
                  <span className="font-medium">{product.price}</span>
                </div>
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
