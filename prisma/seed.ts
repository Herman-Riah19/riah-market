import { Hashing, hashPassword } from "@/lib/hash";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const response = await Promise.all([
        await prisma.user.create({
            data: {
                name: "herman",
                email: "herman@gmail.com",
                password: (hashPassword("Hermann") as Hashing).hash,
                address: "0x057cE32652728640cF4B1f0F7FBD7C35E0eFEcA3",
            },
        }),
    ])
    console.log(response)
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });