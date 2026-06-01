"use client";
import type { Metadata } from "next";

import Image from "next/image";
import Hero from "./components/hero";
import GivingWidget from "../components/giving/GivingWidget";
import { useGeoCountry } from "@/app/hooks/useGeoCountry";

//TODO - add metadata
// export const metadata: Metadata = {
// 	title: "Sign Up | Hope for Justice",
// 	description:
// 		"Join the Hope for Justice mailing list for updates and practical tips to make the biggest impact for victims and survivors. Sign up to our email updates today!",
// 	openGraph: {
// 		title: "Sign Up | Hope for Justice",
// 		description:
// 			"Join the Hope for Justice mailing list for updates and practical tips to make the biggest impact for victims and survivors. Sign up to our email updates today!",
// 		type: "website",
// 		images: [
// 			{
// 				url: "https://hopeforjustice.org/wp-content/uploads/2022/12/sign-up-to-our-mailing-list.jpg",
// 				width: 1200,
// 				height: 630,
// 				alt: "Sign up to our newsletter",
// 			},
// 		],
// 	},
// 	twitter: {
// 		card: "summary_large_image",
// 		title: "Sign Up | Hope for Justice",
// 		description:
// 			"Join the Hope for Justice mailing list for updates and practical tips to make the biggest impact for victims and survivors. Sign up to our email updates today!",
// 		images: [
// 			"https://hopeforjustice.org/wp-content/uploads/2022/12/sign-up-to-our-mailing-list.jpg",
// 		],
// 	},
// };

export default function SignUpPage() {
	const country = useGeoCountry();
	return (
		<main className="bg-white font-apercu font-bold overflow-x-hidden max-w-480 mx-auto">
			{/* Hero (campaign specific) */}
			<Hero />

			{/* Giving */}
			<div id="donate" className="w-full flex pb-4">
				{/* back of head image */}
				<div className="w-2/5 hidden lg:block rounded-r-[60px] overflow-hidden">
					<Image
						src="/woman-back-of-head_AdobeStock_262590365-extended.jpg"
						alt="back of head image"
						width={1024}
						height={1024}
						className="object-cover w-full h-full"
					/>
				</div>
				<div className="w-full lg:w-3/5 bg-[#FEF5DE] rounded-4xl lg:rounded-[60px] mt-2 lg:mt-0 mx-2 lg:mx-4 p-8 lg:p-12 flex items-center justify-center">
					<div>
						{/* giving widget header (custom to campaign) */}
						<div>
							<div className="w-full mb-6">
								<img
									src="/fundfreedom.svg"
									alt=""
									className="w-full max-w-2xl mx-auto"
								/>
							</div>
						</div>
						{/* giving widget (resusable component) */}
						<div className="w-full max-w-xl mx-auto">
							<GivingWidget
								textColor="#FA8F53"
								buttonColor="#FAA36D"
								selectedButtonColor="#D6001C"
								matchFunding={true}
								campaign="2026 Summer"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Fundraise for freedom */}
			<div id="fundraiseforfreedom" className="p-2 lg:p-4 pt-0 lg:pt-0">
				<div className="w-full bg-[#ACD8BA] rounded-4xl lg:rounded-[60px] flex flex-col items-center justify-center space-y-8 p-6 py-10 lg:py-14">
					<div className="w-full max-w-2xl mx-auto">
						<img src="fundraiseforfreedom.svg" alt="" />
					</div>
					<p className="text-center max-w-3xl text-[#425252]">
						Impact against this overwhelming issue is possible, but only when we
						come together and take action – our work depends on a whole movement
						of ordinary people who are getting equipped and educated and being
						vigilant in their communities, and giving generously to empower and
						expand this work into new areas to reach more people.
					</p>
					<img src="/50waysmockup.png" alt="" />
					{/* buttons */}
					<div className="flex flex-wrap gap-4 justify-center items-start mt-6 lg:text-lg xl:text-xl">
						<a
							href="#"
							className="bg-[#FEF5DE] text-[#ACD8BA] px-8 py-4 rounded-lg  hover:bg-[#FEF5DE]/90 transition font-bold min-w-24 lg:min-w-38 text-center"
						>
							Download 50 ways to make an impact
						</a>
						<a
							href={
								country === "US"
									? "https://giving.gofundme.com/campaign/790229/landing"
									: "https://www.justgiving.com/campaign/50daysofhope"
							}
							className="bg-[#FA8F53] text-white px-8 py-4 rounded-lg  hover:bg-[#FA8F53]/90 transition font-bold min-w-24 lg:min-w-38 text-center"
						>
							Start your fundraiser
						</a>
					</div>
					{/* matchfunding disclaimer */}
					<p className="mt-4 text-sm text-center text-[#425252]">
						*All donations will be doubled up to $175,000 thanks to a generous
						donor!
					</p>
				</div>
			</div>
		</main>
	);
}
