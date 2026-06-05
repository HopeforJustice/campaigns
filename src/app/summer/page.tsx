import type { Metadata } from "next";
import { Suspense } from "react";
import SummerCampaignClient from "./SummerCampaignClient";

//TODO - add metadata
export const metadata: Metadata = {
	title: "50 days of hope | Hope for Justice",
	description:
		"In summer 2026, let’s raise funds to change lives! We say: Impact on human trafficking IS possible. We choose hope. We choose to give our time and energy so others can live in freedom and dignity.",
	alternates: {
		canonical: "/summer",
	},
	openGraph: {
		title: "50 days of hope | Hope for Justice",
		description:
			"In summer 2026, let’s raise funds to change lives! We say: Impact on human trafficking IS possible. We choose hope. We choose to give our time and energy so others can live in freedom and dignity.",
		type: "website",
		url: "/summer",
		images: [
			{
				url: "/2026summerog.png",
				width: 1200,
				height: 630,
				alt: "50 days of hope | Hope for Justice",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "50 days of hope | Hope for Justice",
		description:
			"In summer 2026, let’s raise funds to change lives! We say: Impact on human trafficking IS possible. We choose hope. We choose to give our time and energy so others can live in freedom and dignity.",
		images: ["/2026summerog.png"],
	},
};

export default function SummerCampaign() {
	return (
		<Suspense fallback={null}>
			<SummerCampaignClient />
		</Suspense>
	);
}
