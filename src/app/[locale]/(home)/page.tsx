import { CreateContent } from "./components/container/createContent";
import { IntroductionContent } from "./components/container/introductionContent";
import { ListCreatorContent } from "./components/container/listCreatorContent";
import { ListProductContent } from "./components/container/listProductContent";
import { ServiceContents } from "./components/container/servicesContent";
import { listProducts } from "../../../services/serviceProduct";

export default async function Home() {
  const { success, products } = await listProducts({
    filter: 4
  });

  return (
    <main role="main" className="m-0 p-0">
      <IntroductionContent />
      {!success ? (
        <div className="text-center text-secondary-foreground mt-4">
          <p className="text-xl font-bold">Loading products...</p>
        </div>
      ) : (
        <ListProductContent products={products} />
      )}
      <ServiceContents />
      <ListCreatorContent />
      <CreateContent />
    </main>
  );
}
