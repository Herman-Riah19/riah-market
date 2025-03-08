"use client"
import React from 'react'
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react"
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ConnectWalletButton = () => {
    const { sdk, connected, connecting, account } = useSDK();

    const connect = async () => {
        try{
            await sdk?.connect();
        } catch(error) {
            console.log(error)
        }
    }

    const disconnect = () => {
        if(sdk) {
            sdk.terminate();
        }
    }

    return (
        <div className='relative'>
            {connected ? (
                <Popover>
                    <PopoverTrigger>
                        <Button>{account}</Button>
                    </PopoverTrigger>
                    <PopoverContent onClick={disconnect}>
                        Disconnected
                    </PopoverContent>
                </Popover>
            ) : (
                <Button variant="secondary" disabled={connecting} onClick={connect} className="flex flex-row gap-2">
                    <Wallet />  Connect Wallet
                </Button>
            )}
        </div>
    )
}

const PageLogin = () => {
    const host = typeof window !== "undefined" ? window.location.host : "defaultHost";

    const sdkOption = {
        logging: { developerMode: false },
        checkInstallationImmediately: false,
        dappMetadata: {
            name: "Riah-Marketplace",
            url: host
        }
    }

    return (
        <main role="main" className='h-screen flex flex-col items-center justify-center m-4'>
        <Card>
            <CardHeader>
                <CardTitle className='text-center uppercase'>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <MetaMaskProvider debug={false} sdkOptions={sdkOption}>
                    <ConnectWalletButton />
                </MetaMaskProvider>
            </CardContent>
        </Card>
        </main>
    )
}

export default PageLogin