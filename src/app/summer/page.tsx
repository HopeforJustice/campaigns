import type { Metadata } from "next";
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
				url: "/hfj-run.jpg",
				width: 1200,
				height: 630,
				alt: "Sign up to our newsletter",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "50 days of hope | Hope for Justice",
		description:
			"In summer 2026, let’s raise funds to change lives! We say: Impact on human trafficking IS possible. We choose hope. We choose to give our time and energy so others can live in freedom and dignity.",
		images: ["/hfj-run.jpg"],
	},
};

export default function SummerCampaign() {
	return <SummerCampaignClient />;
}
