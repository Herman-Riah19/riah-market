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
  if (!success) return <div> loading products</div>;

  return (
    <main role="main" className="m-0 p-0">
      <IntroductionContent />
      <ListProductContent products={products} />
      <ServiceContents />
      <ListCreatorContent />
      <CreateContent />
    </main>
  );
}
