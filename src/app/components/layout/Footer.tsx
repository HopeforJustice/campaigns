export default function Footer() {
	return (
		<footer className="bg-[#212322] text-white p-8 lg:p-12 max-w-[1920px] mx-auto">
			<p className="text-xs text-white/90">
				We use cookies to help make this website better. Here’s our{" "}
				<a
					className="underline"
					href="https://hopeforjustice.org/privacy"
					target="_blank"
				>
					Privacy Policy
				</a>
				, explaining how we use cookies. You can change the cookie settings on
				your browser. Otherwise, we’ll assume you’re OK to continue.{" "}
				<span className="text-hfj-red">|</span> Hope for Justice is a 501(c)(3)
				not for profit organization in the USA. All gifts received are tax
				deductible as charitable contributions for federal income tax purposes
				(EIN 75-3179471). <span className="text-hfj-red">|</span> Hope for
				Justice is a registered charity in England & Wales (no. 1126097) and in
				Scotland (no. SC045769), and a company limited by guarantee, registered
				in England and Wales, number 6563365. Registered office: 30 Old Bailey,
				London, EC4M 7AU. <span className="text-hfj-red">| </span>
				Hope for Justice (Australia) Ltd, ABN 28 639 382 782, is a registered
				charity with the Australian Charities and Not-for-profits Commission (
				<a className="underline" href="https://www.acnc.gov.au/">
					ACNC
				</a>
				) and granted public benevolent institution (PBI) status. Donations of
				$2 or more are fully tax deductible in Australia as allowed by law.
				Registered office: Hope for Justice (Australia) Ltd, 477 Boundary
				Street, Spring Hill QLD 4000.
			</p>
			{/* logos */}
			<div className="flex flex-wrap justify-between gap-6 items-center mt-8">
				<div>
					<img
						src="logo-straight-white.svg"
						alt=""
						className="max-w-48 lg:max-w-64"
					/>
				</div>
				<div className="flex flex-wrap gap-4 justify-center items-center h-10">
					<img className="h-full" src="candid.png" alt="" />
					<img className="h-full" src="fundraising-reg.png" alt="" />
					<img className="h-full" src="coalition.png" alt="" />
				</div>
			</div>
		</footer>
	);
}
