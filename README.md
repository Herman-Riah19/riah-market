
# **AI-Generated NFT Digital Art Collection**

Une application complète permettant de générer, gérer et publier des œuvres d’art numériques sous forme de **NFT** grâce à l’**intelligence artificielle**.
Elle combine **Next.js** pour le frontend, **Prisma** pour la base de données, et **Hardhat** pour le déploiement des smart contracts.

---

## **Prérequis**

Assurez-vous d’avoir installé :

* [Node.js](https://nodejs.org/) (version recommandée : 18+)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
* [PostgreSQL](https://www.postgresql.org/) (ou autre base compatible Prisma)
* [Metamask](https://metamask.io/) ou tout autre wallet pour interagir avec les smart contracts.

---

## **1. Installation des dépendances**

Clonez le projet et installez les dépendances :

```bash
git clone https://github.com/Herman-Riah19/riah-market.git
cd ai-nft-collection
npm install
```

---

## **2. Configuration des variables d’environnement**

Créez un fichier **`.env`** à la racine du projet :

```env
PINATA_API_KEY=""
PINATA_API_SECRET=""
PINATA_JWT=""
NEXT_PUBLIC_GATEWAY_URL="https://chocolate-quickest-roundworm-127.mypinata.cloud"
NEXT_PUBLIC_GATEWAY_TOKEN=

ALCHEMY_URL="https://eth-mainnet.g.alchemy.com/v2/<API_KEY_SECRET>"
PRIVATE_KEY=""
CONTRACT_ADDRESS=""

DATABASE_URL="postgresql://user:password@localhost:5432/nftdb"

NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000/api/auth"

STABILITY_AI_KEY="sk-..."
```

---

## **3. Migration Prisma**

Initialisez la base de données avec Prisma :

```bash
npx prisma migrate dev
```

Pour visualiser et interagir avec la base :

```bash
npx prisma studio
```

---

## **4. Déploiement des smart contracts (Hardhat)**

Compilez et déployez vos contrats sur un réseau de test (ex: Sepolia) :

```bash
cd blockchain
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

Une fois déployé, mettez à jour l’adresse du contrat dans votre fichier de configuration frontend (ex: `constants/contract-address.ts`).

---

## **5. Lancement de l’application**

Revenez à la racine et lancez le serveur Next.js :

```bash
npm run dev
```

Accédez à l’application : [http://localhost:3000](http://localhost:3000)

---

## **Fonctionnalités principales**

* **Génération d’art par IA**
* **Tokenisation des œuvres en NFT**
* **Gestion et visualisation de la collection**
* **Déploiement sur la blockchain via Hardhat**

---

## **Scripts utiles**

* `npm run build` → Build de l’application
* `npx prisma generate` → Regénération du client Prisma
* `npx hardhat test` → Tests des smart contracts
