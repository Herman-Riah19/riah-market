import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, LineChart } from 'lucide-react'
import { OverlappingImage } from './overlappingImage'

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

      <div className="absolute inset-0">
        <LineChart />
      </div>

      <OverlappingImage />
    </div>
  )
}
