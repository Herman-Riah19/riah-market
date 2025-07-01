import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Creator } from '@/data/creator-data';

export const CardCreator: React.FC<Creator> = ({ name, value, image, rank = 1 }) => {
  return (
    <Card className="relative rounded-xl bg-muted p-4">
      {/* Badge rank */}
      <span className="absolute top-2 left-2 bg-black/30 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {rank}
      </span>

      <CardHeader 
        className="self-center h-[30vh] md:h-[30vh] lg:h-[18vh] w-[50vw] md:w-[20vw] lg:w-[10vw] rounded-full"
        style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />

      <CardContent className="mt-4 p-0">
        <CardTitle className="text-base text-center">{name}</CardTitle>
      </CardContent>

      <CardFooter className="block text-center text-sm text-muted-foreground">
        <span className="text-xs">Total Sales:</span>
        <span className="text-white font-semibold">{value.toFixed(2)} ETH</span>
      </CardFooter>
    </Card>
  );
};
