"use client";
import * as React from "react";
import { CardPresentation } from "../card/cardPresentation";
import { OverlappingImage } from "./overlappingImage";

export function IntroductionContent() {
  return (
    <section className="relative bg-muted m-2 p-4 overflow-hidden">
      <div className="block md:grid grid-cols-2 gap-4 m-2">
        <CardPresentation />
        <OverlappingImage />
      </div>
    </section>
  );
}
