import type { Metadata } from "next";
import HeroWithImageTiles from "@/app/components/hero-sections/HeroWithImageTiles";

export const metadata: Metadata = {
	title: "Sign Up | Hope for Justice",
	description:
		"Join the Hope for Justice mailing list for updates and practical tips to make the biggest impact for victims and survivors. Sign up to our email updates today!",
	openGraph: {
		title: "Sign Up | Hope for Justice",
		description:
			"Join the Hope for Justice mailing list for updates and practical tips to make the biggest impact for victims and survivors. Sign up to our email updates today!",
		type: "website",
		images: [
			{
				url: "https://hopeforjustice.org/wp-content/uploads/2022/12/sign-up-to-our-mailing-list.jpg",
				width: 1200,
				height: 630,
				alt: "Sign up to our newsletter",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Sign Up | Hope for Justice",
		description:
			"Join the Hope for Justice mailing list for updates and practical tips to make the biggest impact for victims and survivors. Sign up to our email updates today!",
		images: [
			"https://hopeforjustice.org/wp-content/uploads/2022/12/sign-up-to-our-mailing-list.jpg",
		],
	},
};

export default function SignUpPage() {
	return (
		<main>
			<HeroWithImageTiles />
		</main>
	);
}
