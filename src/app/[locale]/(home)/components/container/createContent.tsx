import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'

export const CreateContent = () => {
  return (
    <div className="bg-primary rounded-2xl overflow-hidden relative flex items-center justify-between px-8 py-10 max-md:flex-col max-md:gap-6 m-4">
      {/* Left Side Content */}
      <div className="z-10 max-w-md">
        <h2 className="text-3xl font-bold text-black mb-6">
          Discover, create and <br /> sell your own NFT
        </h2>
        <div className="flex gap-4 flex-wrap">
          <Button className="bg-black text-white hover:bg-black/80">
            Explore Now
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
          <Button className="bg-black text-white hover:bg-black/80">
            Create Your First NFT
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Right Side Background Illustration */}
      <div className="absolute inset-0">
        <Image
          src="/images/bg-lines.svg" // Replace with actual SVG or background design
          alt="Background pattern"
          fill
          className="object-cover opacity-20"
        />
      </div>

      {/* Right Side Cards (Overlapping NFTs) */}
      <div className="hidden md:flex gap-4 pr-6 z-10">
        <Image
          src="/asset/images/image_2.jpg" // Replace with your actual mock card image
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
  )
}
