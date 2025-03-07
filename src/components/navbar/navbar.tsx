"use client"
import React from 'react'
import { Dock, DockIcon } from '@/components/ui/dock'
import Link from 'next/link'
import { House } from "lucide-react"

export const Navbar = () => {
    const pages = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Products",
            link: "/product",
        },
        {
            name: "Blog",
            link: "/blog",
        },
        {
            name: "About",
            link: "/about",
        },
    ];
  return (
    <header className="pointer-events-none fixed inset-x-0 top-1 z-30 mx-auto mb-2 flex origin-bottom h-full max-h-14">
        <div className="fixed top-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-background"></div>
        <Dock className="z-50 pointer-events-auto relative mx-auto flex gap-2 min-h-full h-full items-center rounded-3xl px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
            {pages.map((page, index) => (
                <DockIcon key={index} className='m-4'>
                    <Link href={page.link} >{page.name}</Link>
                </DockIcon>
            ))}
        </Dock>
    </header>
  )
}
