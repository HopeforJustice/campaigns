import Header from "@/app/components/layout/Header";
import Image from "next/image";

export default function Hero() {
	return (
		<div className="w-full h-full p-1 md:p-4">
			<div className="w-full h-full bg-[url('/summer-orange-rect.svg')] md:bg-[url(/summer-orange-rect-large.svg)] bg-cover bg-center bg-no-repeat relative pb-4 lg:pb-8 xl:pb-12">
				{/* yellow star */}
				<img
					src="/yellow-star.svg"
					alt=""
					className="w-[150px] lg:w-[280px] xl:w-[377px] absolute top-[-60px] lg:top-[-140px] xl:top-[-160px] right-[-60px] lg:right-[-120px] xl:right-[-160px]"
				/>

				{/* blue squiggle 1 */}
				<img
					src="/blue-squiggle-1.svg"
					alt=""
					className="hidden lg:block lg:w-[200px] xl:w-[380px] absolute top-[-20px] lg:top-[140px] xl:top-[160px] left-[-40px] lg:left-[-80px] xl:left-[-120px]"
				/>

				{/* blue squiggle 2 */}
				<img
					src="/blue-squiggle-2.svg"
					alt=""
					className="w-[150px] lg:w-[200px] xl:w-[300px] absolute top-[600px] lg:top-[700px] xl:top-[650px] right-[-30px] lg:right-[-50px] xl:right-[-50px]"
				/>

				{/* red star */}
				<img
					src="/red-star.svg"
					alt=""
					className="w-[150px] lg:w-[200px] xl:w-[300px] absolute left-[-50px] lg:left-[-80px] xl:left-[-80px] bottom-[-20px] lg:bottom-[-80px] xl:bottom-[-120px]"
				/>

				{/* hfj logo */}
				<div className="absolute top-6 lg:top-10 left-6 lg:left-10">
					<Header
						logoClassName="block w-48 sm:w-[250px] lg:w-[330px]"
						color="all-white"
						layout="none"
					/>
				</div>

				{/* 50 days branding logo */}
				<div className="pt-24 sm:pt-36 lg:pt-36 w-[80%] max-w-150 lg:max-w-200 mx-auto flex justify-center">
					<picture>
						<source media="(min-width: 640px)" srcSet="/50-days-desktop.svg" />
						<img src="/50-days-mobile.svg" alt="" />
					</picture>
				</div>

				{/* hero text */}
				<div className="px-4 text-center mt-6 max-w-[70ch] mx-auto">
					<p className="text-xl lg:text-2xl xl:text-3xl text-[#FFF5DE] lg:my-6">
						For the 50+ million people affected by <br />
						modern slavery & human trafﬁcking
					</p>
					<p className="text-[#FFF5DE] mt-4">
						In summer 2026, let’s raise funds to change lives! We say: Impact on
						human trafficking IS possible. We choose hope. We choose to give our
						time and energy so others can live in freedom and dignity.
					</p>
				</div>

				{/* hero buttons */}
				<div className="flex gap-4 justify-center items-start mt-6 lg:text-lg xl:text-xl">
					<a
						href="#"
						className="bg-[#FEF5DE] text-[#FA8F53] px-8 py-4 rounded-lg  hover:bg-[#FEF5DE]/90 transition font-bold min-w-24 lg:min-w-38 text-center"
					>
						Fundraise
					</a>
					<div className="flex justify-center flex-col items-center">
						<a
							href="#"
							className="bg-[#d21220] text-white px-8 py-4 rounded-lg  hover:bg-[#d21220]/90 transition font-bold min-w-24 lg:min-w-38 text-center"
						>
							Donate
						</a>
						<p className="bg-[#FEBC00] text-white rounded-lg text-sm text-center px-2 py-1 -mt-2">
							Every gift doubled*
						</p>
					</div>
				</div>

				{/* hero images */}
				<div className="w-full flex justify-center mt-8 lg:mt-12 xl:mt-16 gap-4 xl:gap-6">
					{/* image 1 */}
					<div className="w-[300px] h-[200px] xl:w-[475px] xl:h-[375px] rounded-3xl xl:rounded-[60px] bg-black overflow-hidden order-2">
						<Image
							src="/Extreme-Challenge-2024-fundraising-campaign-for-Hope-for-Justice-(3).jpg"
							alt="mountain climbing fundraiser"
							width={500}
							height={400}
							className="object-cover w-full h-full"
						/>
					</div>
					{/* image 2 */}
					<div className="hidden sm:block w-[300px] h-[200px] xl:w-[475px] xl:h-[375px] rounded-3xl xl:rounded-[60px] bg-black overflow-hidden order-1">
						<Image
							src="/50kwalk.jpg"
							alt="mountain climbing fundraiser"
							width={500}
							height={400}
							className="object-cover w-full h-full"
						/>
					</div>
					{/* image 3 */}
					<div className="hidden lg:block w-[300px] h-[200px] xl:w-[475px] xl:h-[375px] rounded-3xl xl:rounded-[60px] bg-black overflow-hidden order-3">
						<Image
							src="/hfj-run.jpg"
							alt="mountain climbing fundraiser"
							width={500}
							height={400}
							className="object-cover w-full h-full"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
