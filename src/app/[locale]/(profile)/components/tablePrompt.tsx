"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllImageGenerated } from "@/services/serviceProduct";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";

export default function TablePrompt() {
  const [images, setImages] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchImages = async () => {
      const allImages: Product[] | undefined = await getAllImageGenerated();
      if (allImages) {
        setImages(allImages);
      }
    };

    fetchImages();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilterImages = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const filteredImages = images.filter((prompt) =>
      prompt.title.toLowerCase().includes(search.toLowerCase())
    );
    setImages(filteredImages);
  };

  return (
    <div className="col-span-3 m-1">
      <form className="m-2" onSubmit={handleFilterImages}>
        <div className="relative flex gap-2">
          <Button type="submit" variant="outline">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </Button>
          <Input
            type="text"
            placeholder="Search products..."
            name="search"
            value={search}
            onChange={handleSearchChange}
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
      <div className="m-4">
        <Table>
          <TableCaption>A list of your recent prompts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Prompt</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images &&
              images.map((prompt) => (
                <TableRow key={prompt.id}>
                  <TableCell>{prompt.title}</TableCell>
                  <TableCell>
                    {prompt.description}
                  </TableCell>
                  <TableCell>{prompt.createdAt.toLocaleString()}</TableCell>
                  <TableCell>{prompt.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
