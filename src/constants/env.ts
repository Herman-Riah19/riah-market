export const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL
	? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs`
	: "https://gateway.pinata.cloud/ipfs";