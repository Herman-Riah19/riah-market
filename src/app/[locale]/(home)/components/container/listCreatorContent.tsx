"use client"

import { CardCreator } from "@/components/card/cardCreator";
import { creators } from "@/datas/creator-data";

export function ListCreatorContent () {
  return (
      <section className="m-8">
        <h3 className="text-2xl font-bold mb-4">Creators</h3>
        <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
  );
}
