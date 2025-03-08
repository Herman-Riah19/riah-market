"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Rabbit, Bird, Turtle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const PageGenerate = () => {
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState<string>("");

  // Fonction pour gérer le changement dans l'entrée du prompt
  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("output_format", "png");

      const response = await fetch(
        "https://api.stability.ai/v2beta/stable-image/generate/core",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer sk-kaY13rB0Okp7Uy4ApD5B5LB9GHrkVpvAs3iaVtXZeCVg9lck`,
            Accept: "image/*",
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        setImage(url);
      } else {
        const errorText = await response.text();
        throw new Error(`${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDownload = () => {
    // Télécharger l'image
    const link = document.createElement("a");
    link.href = image;
    link.download = "image.png"; // Nom du fichier téléchargé
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid w-full pl-[53px] mt-12">
      <main
        role="main"
        className="grid flex-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          className="relative hidden flex-col items-start gap-8 md:flex"
          x-chunk="dashboard-03-chunk-0"
        >
          <form
            onSubmit={handleSubmit}
            className="grid w-full items-start gap-6"
          >
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Settings
              </legend>
              <div className="grid gap-3">
                <Label>Prompt of the image</Label>
                <Input
                  type="text"
                  id="prompt"
                  placeholder="Your imagination's prompt"
                  value={prompt}
                  onChange={handlePromptChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="top-p">Top P</Label>
                  <Input id="top-p" type="number" placeholder="0.7" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="top-k">Top K</Label>
                  <Input id="top-k" type="number" placeholder="0.0" />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="model">Model</Label>
                  <Select>
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="genesis">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Rabbit className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{" "}
                              <span className="font-medium text-foreground">
                                Genesis
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Our fastest model for general use cases.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="explorer">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Bird className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{" "}
                              <span className="font-medium text-foreground">
                                Explorer
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Performance and speed for efficiency.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="quantum">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Turtle className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{" "}
                              <span className="font-medium text-foreground">
                                Quantum
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              The most powerful model for complex
                              computations.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
              </div>
              <Button type="submit" className="text-white px-4 py-2 rounded-md">
                Générer Image
              </Button>
            </fieldset>
          </form>
        </div>
        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
          <Badge variant="outline" className="absolute right-3 top-3">Output</Badge>
          <Card className="bg-transparent border-none shadow-none overflow-hidden mt-5 h-full">
            <CardHeader>
              <CardTitle>Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                  {image ? (
                    <Image src={image} alt="image" className="aspect-square w-full rounded-md object-cover h-full"/>
                  ) : (
                    <span className="h-[300px] w-[200px] rounded-md object-cover">Fresh image...</span>
                  )}
              </div>
              <div className="mt-auto">
                <Button
                  onClick={handleDownload}
                  className="text-white px-4 py-2 rounded-md"
                >
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PageGenerate;
