"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import * as React from "react";
import { useQueryState } from "nuqs";

export interface ISearchInputProps {
  placeholder?: string;
}

export function SearchInput(props: ISearchInputProps) {
  const [search, setSearch] = useQueryState("search", {
    shallow: false,
    throttleMs: 500,
  });
  const { placeholder } = props;

  return (
    <div className="flex items-center justify-center w-full p-4">
      <div className="relative w-full max-w-2xl">
        <Input
          type="search"
          placeholder={placeholder || "Search NFTs"}
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}
