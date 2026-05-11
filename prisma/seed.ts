import { Hashing, hashPassword } from "../src/lib/hash";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BASE_IMAGE_URL = "https://chocolate-quickest-roundworm-127.mypinata.cloud/ipfs/";

const IPFS_IDS = [
    "bafybeigytj6ohaqeh5nhozk7yq4k5ogcmj4nraileo2mvtvuhfdxab7vfe",
    "bafybeie2y7fkl64i7xx5jhh46tat7fd7jb65aphbxwiyyfkr5pkpu4cuyq",
    "bafybeig4uizg2oqcezlakkdsxqkr7hcyedojcugdz6vzl3jva6blmbtjqy",
    "bafybeid4wwhtmmw4k4s5kv3275kg5lunjnv56iw4pnvbftaajpf5lpiedi",
];

const productsData = [
    {
        title: "Princesse Sakura",
        description: "Une princesse magique aux cheveux roses vêtue d'une robe traditionnelle japonaise ornée de fleurs de cerisier. Son sourire doux et ses yeux brillants illuminent chaque tableau.",
        image: BASE_IMAGE_URL + IPFS_IDS[0],
    },
    {
        title: "Princesse Luna",
        description: "Princesse des étoiles et de la lune, avec une longue chevelure argentée et une couronne scintillante. Sa robe bleu nuit est parsemée de constellations magiques.",
        image: BASE_IMAGE_URL + IPFS_IDS[1],
    },
    {
        title: "Princesse Yuki",
        description: "Une princesse des neiges dans son royaume d'hiver. Ses cheveux blancs comme la neige et ses yeux glacés bleus captivent tous ceux qui croisent son regard.",
        image: BASE_IMAGE_URL + IPFS_IDS[2],
    },
    {
        title: "Princesse Aoi",
        description: "Princesse de l'océan aux cheveux turquoise, portant une robe écailles de sirène. Elle danse avec les dauphins et les poissons colorés dans son palais sous-marin.",
        image: BASE_IMAGE_URL + IPFS_IDS[3],
    },
];

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "herman",
            email: "herman@gmail.com",
            password: (hashPassword("Hermann") as Hashing).hash,
            address: "0x057cE32652728640cF4B1f0F7FBD7C35E0eFEcA3",
        },
    })

    const products = await Promise.all(
        productsData.map((p) =>
            prisma.product.create({
                data: {
                    title: p.title,
                    description: p.description,
                    image: p.image,
                    price: 0.05,
                    creator: user.id,
                },
            })
        )
    )

    console.log({ user, products })
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });