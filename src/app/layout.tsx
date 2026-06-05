import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import Footer from "@/app/components/layout/Footer";

const apercu = localFont({
	src: [
		{
			path: "./fonts/apercu-regular-pro.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/apercu-italic-pro.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "./fonts/apercu-bold-pro.woff2",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-apercu",
});

const canela = localFont({
	src: "./fonts/Canela-Medium.woff2",
	weight: "500",
	variable: "--font-canela",
});

const lexend = localFont({
	src: "./fonts/lexend.woff2",
	variable: "--font-lexend",
});

const screamer = localFont({
	src: "./fonts/FKScreamerLegacy-Upright.woff",
	variable: "--font-screamer",
});

function getMetadataBase() {
	const fallbackUrl = "https://campaigns.hopeforjustice.org";
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
	const vercelUrl = process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: undefined;
	try {
		return new URL(siteUrl ?? vercelUrl ?? fallbackUrl);
	} catch {
		return new URL(fallbackUrl);
	}
}

export const metadata: Metadata = {
	title: "Hope for Justice",
	description: "",
	metadataBase: getMetadataBase(),
};

const isProduction = process.env.VERCEL_ENV === "production";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			{isProduction && <GoogleTagManager gtmId="GTM-T7PSM4L" />}
			<body
				className={`${apercu.variable} ${canela.variable} ${lexend.variable} ${screamer.variable} antialiased font-apercu bg-[#ffffff]`}
			>
				{/* <Header /> */}
				{children}
				<Footer />
			</body>
		</html>
	);
}
