"use client"
import { colorMap } from '@/data/color-map';
import React from 'react'

type TypographyProps = {
    children: React.ReactNode;
    variant: string;
    color: string;
    className?: string;
}
export const Typography: React.FC<TypographyProps> = ({ children, variant, color, className }) => {
    const colorClass = colorMap[color] || 'text-black';
    switch(variant) {
        case "h1":
            return (
                <h1 className={`text-[4vw] font-extrabold ${colorClass} ${className}`}>
                    {children}
                </h1>
            )
        case "h2":
            return (
                <h2 className={`text-[3vw] font-bold ${colorClass} ${className}`}>
                    {children}
                </h2>
            )
        case "h3":
            return (
                <h3 className={`text-[2vw] font-semibold ${colorClass} ${className}`}>
                    {children}
                </h3>
            )
        case "h4":
            return (
                <h4 className={`text-[1rem] font-medium ${colorClass} ${className}`}>
                    {children}
                </h4>
            )
        case "h5":
            return (
                <h5 className={`text-3xl font-medium ${colorClass} ${className}`}>
                    {children}
                </h5>
            )
        case "h6":
            return (
                <h6 className={`text-2xl font-normal ${colorClass} ${className}`}>
                    {children}
                </h6>
            )
        case "p":
            return (
                <p className={`text-lg font-normal ${colorClass} ${className}`}>
                    {children}
                </p>
            )
        default:
            return (
                <span className={`text-md font-normal ${className}`}>
                    {children}
                </span>
            )
    }
}
