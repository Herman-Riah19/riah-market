import * as React from "react";
import { SearchInput } from "../components/searchInput";
import { listProducts } from "../services/ServiceProduct";
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString
} from 'nuqs/server'
import { ListProductContent } from "../components/container/listProductContent";
 
const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(''),
  maxResults: parseAsInteger.withDefault(10)
})

export default async function ExplorePage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await searchParamsCache.parse(props.searchParams);
  const { search } = searchParams;

  const { success, products } = await listProducts({
    name: search,
  });
  if (!success) return <div> loading products</div>;

  return (
    <div>
      <SearchInput placeholder="Search NFTs" />
      <ListProductContent products={products} />
    </div>
  );
}
