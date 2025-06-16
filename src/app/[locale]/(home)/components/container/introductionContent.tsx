"use client";
import * as React from "react";
import { CardPresentation } from "../card/cardPresentation";
import Image from "next/image";

export function IntroductionContent() {
  return (
    <section className="relative bg-muted m-2 p-4">
      <div className="grid grid-cols-2 gap-2 m-2">
        <CardPresentation />
        <div className="hidden md:flex gap-4 pr-6 z-10">
          <Image
            src="/asset/images/image_2.jpg" 
            alt="NFT Card"
            width={160}
            height={260}
            className="rotate-[-10deg] shadow-xl rounded-xl"
          />
          <Image
            src="/asset/images/image_3.jpg"
            alt="NFT Card"
            width={160}
            height={260}
            className="rotate-[5deg] shadow-xl rounded-xl"
          />
          <Image
            src="/asset/images/image_4.jpg"
            alt="NFT Card"
            width={160}
            height={260}
            className="rotate-[-3deg] shadow-xl rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
