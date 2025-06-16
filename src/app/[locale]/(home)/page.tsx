import { CreateContent } from "./components/container/createContent";
import { IntroductionContent } from "./components/container/introductionContent";
import { ListCreatorContent } from "./components/container/listCreatorContent";
import { ListProductContent } from "./components/container/listProductContent";
import { ServiceContents } from "./components/container/servicesContent";

export default function Home() {
  
  return (
    <main role="main" className="m-0 p-0">
      <IntroductionContent />
      <ListProductContent />
      <ServiceContents />
      <ListCreatorContent />
      <CreateContent />
    </main>
  );
}
