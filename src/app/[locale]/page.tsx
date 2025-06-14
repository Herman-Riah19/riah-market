import { CardCreator, CardCreatorProps } from "@/components/card/cardCreator";
import { CardPresentation } from "@/components/card/cardPresentation";
import { CardProduct } from "@/components/card/cardProduct";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/datas/product-data";

export default function Home() {

  const creators: CardCreatorProps[] = [
    {
      name: "Alice Doe",
      value: 12.4,
      image: "/asset/profile/profile_1.png",
    },
    {
      name: "Bob Smith",
      value: 9.8,
      image: "/asset/profile/profile_2.png",
    },
    {
      name: "Charlie Johnson",
      value: 15.2,
      image: "/asset/profile/profile_3.png",
    },
    {
      name: "Diana Lee",
      value: 11.6,
      image: "/asset/profile/profile_4.png",
    },
    {
      name: "Alice Doe",
      value: 12.4,
      image: "/asset/profile/profile_1.png",
    },
    {
      name: "Bob Smith",
      value: 9.8,
      image: "/asset/profile/profile_2.png",
    },
    {
      name: "Charlie Johnson",
      value: 15.2,
      image: "/asset/profile/profile_3.png",
    },
    {
      name: "Diana Lee",
      value: 11.6,
      image: "/asset/profile/profile_4.png",
    },
  ];  
  
  return (
    <main role="main" className="m-0 p-0">
      <section className="relative bg-muted m-0 p-0">
        <div className="grid grid-cols-2 gap-4 m-4">
          <CardPresentation />
          <article className="flex flex-col items-center justify-center">
            <CardProduct id="" title="Triumphant Awakening" creator="Trista Francis" price={4.89} image="/asset/images/image_1.jpg" profile="/asset/profile/profile_1.png" />
          </article>
        </div>
      </section>

      <section className="m-8">
        <h3 className="text-2xl font-bold mb-4">Live auction</h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((prod, index) => (
            <div key={index}>
              <CardProduct 
                id={prod.id}
                title={prod.title} 
                creator={prod.creator} 
                price={prod.price} 
                image={prod.image} 
                profile={prod.profile} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted p-0 m-0">
          <Card>
            <CardHeader>
              <CardTitle>Generate your own NFT using AI</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ullam natus saepe similique libero reprehenderit animi! Nostrum aliquam quisquam modi ad quidem quam! Quibusdam voluptas maxime sapiente ut placeat laudantium!
              </CardDescription>
            </CardContent>
          </Card>
      </section>

      <section className="m-8">
        <h3 className="text-2xl font-bold mb-4">Creators</h3>
        <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {creators.map((creator, index) => (
            <div key={index}>
              <CardCreator
                name={creator.name}
                value={creator.value}
                image={creator.image}/>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
