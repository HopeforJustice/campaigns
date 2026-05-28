import type { Metadata } from "next";

import Image from "next/image";
import Hero from "./components/hero";
import GivingWidget from "../components/giving/GivingWidget";

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
	return (
		<main className="bg-white font-apercu font-bold overflow-x-hidden max-w-480 mx-auto">
			{/* Hero (campaign specific) */}
			<Hero />

			{/* Giving */}
			<div className="w-full flex pb-4">
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
		</main>
	);
}
