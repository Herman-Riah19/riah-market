// "use client";
// import React from "react";
// import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
// import { Button } from "@/components/ui/button";
// import { Wallet } from "lucide-react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { useTranslations } from "next-intl";

// const ConnectWalletButton = () => {
//     const { sdk, connected, connecting, account } = useSDK();
//     const t = useTranslations("Navbar")
//     const connect = async () => {
//         try {
//         await sdk?.connect();
//         } catch (error) {
//         console.log(error);
//         }
//     };

//     const disconnect = () => {
//         if (sdk) {
//             sdk.terminate();
//         }
//     };

//     return (
//         <div className="relative">
//         {connected ? (
//             <Popover>
//             <PopoverTrigger>
//                 <Button>{account}</Button>
//             </PopoverTrigger>
//             <PopoverContent onClick={disconnect}>{t("Disconnected")}</PopoverContent>
//             </Popover>
//         ) : (
//             <Button
//             variant="secondary"
//             disabled={connecting}
//             onClick={connect}
//             className="flex flex-row gap-2"
//             >
//                 <Wallet /> {t("ConnectWallet")}
//             </Button>
//         )}
//         </div>
//     );
// };

// export const ButtonConnect = () => {
//   const host =
//     typeof window !== "undefined" ? window.location.host : "defaultHost";

//   const sdkOption = {
//     logging: { developerMode: false },
//     checkInstallationImmediately: false,
//     dappMetadata: {
//       name: "Riah-Marketplace",
//       url: host,
//     },
//   };

//   return (
//     <MetaMaskProvider debug={false} sdkOptions={sdkOption}>
//       <ConnectWalletButton />
//     </MetaMaskProvider>
//   );
// };
