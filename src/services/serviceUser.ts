"use server"
import { prisma } from "@/utils/prisma";

export async function getUserByAddressAction(address: string) {
    try {
        if (!address) {
        throw new Error('Address is required');
    }
    const user = await prisma.user.findFirst({
        where: {
            address: address,
        },
    });
    if (!user) {
        throw new Error('User not found');
    }
    return {
        success: true,
        user
    }
    } catch (error) {
        console.error("Error fetching user by address:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred'
        };        
    }
}