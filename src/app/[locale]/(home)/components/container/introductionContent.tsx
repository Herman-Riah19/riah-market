"use client";
import * as React from "react";
import { CardPresentation } from "../card/cardPresentation";
import Image from "next/image";

export function IntroductionContent() {
  return (
    <section className="relative bg-muted m-2 p-4 overflow-hidden">
      <div className="block md:grid grid-cols-2 gap-4 m-2">
        <CardPresentation />
        <div className="hidden md:flex gap-4 pr-6 z-0">
          <Image
            src="/asset/images/image_2.jpg" 
            alt="NFT Card"
            width={200}
            height={260}
            className="rotate-[-10deg] shadow-xl rounded-xl"
          />
          <Image
            src="/asset/images/image_3.jpg"
            alt="NFT Card"
            width={200}
            height={260}
            className="rotate-[5deg] shadow-xl rounded-xl"
          />
          <Image
            src="/asset/images/image_4.jpg"
            alt="NFT Card"
            width={200}
            height={260}
            className="hidden lg:block rotate-[-3deg] shadow-xl rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
