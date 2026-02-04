"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import CountrySelect from "./CountrySelect";

interface CountryOption {
	code: string;
	name: string;
}

const countries: CountryOption[] = [
	{ code: "AF", name: "Afghanistan" },
	{ code: "AL", name: "Albania" },
	{ code: "DZ", name: "Algeria" },
	{ code: "AD", name: "Andorra" },
	{ code: "AO", name: "Angola" },
	{ code: "AG", name: "Antigua and Barbuda" },
	{ code: "AR", name: "Argentina" },
	{ code: "AM", name: "Armenia" },
	{ code: "AU", name: "Australia" },
	{ code: "AT", name: "Austria" },
	{ code: "AZ", name: "Azerbaijan" },
	{ code: "BS", name: "Bahamas" },
	{ code: "BH", name: "Bahrain" },
	{ code: "BD", name: "Bangladesh" },
	{ code: "BB", name: "Barbados" },
	{ code: "BY", name: "Belarus" },
	{ code: "BE", name: "Belgium" },
	{ code: "BZ", name: "Belize" },
	{ code: "BJ", name: "Benin" },
	{ code: "BT", name: "Bhutan" },
	{ code: "BO", name: "Bolivia" },
	{ code: "BA", name: "Bosnia and Herzegovina" },
	{ code: "BW", name: "Botswana" },
	{ code: "BR", name: "Brazil" },
	{ code: "BN", name: "Brunei" },
	{ code: "BG", name: "Bulgaria" },
	{ code: "BF", name: "Burkina Faso" },
	{ code: "BI", name: "Burundi" },
	{ code: "KH", name: "Cambodia" },
	{ code: "CM", name: "Cameroon" },
	{ code: "CA", name: "Canada" },
	{ code: "CV", name: "Cape Verde" },
	{ code: "CF", name: "Central African Republic" },
	{ code: "TD", name: "Chad" },
	{ code: "CL", name: "Chile" },
	{ code: "CN", name: "China" },
	{ code: "CO", name: "Colombia" },
	{ code: "KM", name: "Comoros" },
	{ code: "CG", name: "Congo" },
	{ code: "CR", name: "Costa Rica" },
	{ code: "HR", name: "Croatia" },
	{ code: "CU", name: "Cuba" },
	{ code: "CY", name: "Cyprus" },
	{ code: "CZ", name: "Czech Republic" },
	{ code: "CD", name: "Democratic Republic of the Congo" },
	{ code: "DK", name: "Denmark" },
	{ code: "DJ", name: "Djibouti" },
	{ code: "DM", name: "Dominica" },
	{ code: "DO", name: "Dominican Republic" },
	{ code: "EC", name: "Ecuador" },
	{ code: "EG", name: "Egypt" },
	{ code: "SV", name: "El Salvador" },
	{ code: "GQ", name: "Equatorial Guinea" },
	{ code: "ER", name: "Eritrea" },
	{ code: "EE", name: "Estonia" },
	{ code: "ET", name: "Ethiopia" },
	{ code: "FJ", name: "Fiji" },
	{ code: "FI", name: "Finland" },
	{ code: "FR", name: "France" },
	{ code: "GA", name: "Gabon" },
	{ code: "GM", name: "Gambia" },
	{ code: "GE", name: "Georgia" },
	{ code: "DE", name: "Germany" },
	{ code: "GH", name: "Ghana" },
	{ code: "GR", name: "Greece" },
	{ code: "GD", name: "Grenada" },
	{ code: "GT", name: "Guatemala" },
	{ code: "GN", name: "Guinea" },
	{ code: "GW", name: "Guinea-Bissau" },
	{ code: "GY", name: "Guyana" },
	{ code: "HT", name: "Haiti" },
	{ code: "HN", name: "Honduras" },
	{ code: "HU", name: "Hungary" },
	{ code: "IS", name: "Iceland" },
	{ code: "IN", name: "India" },
	{ code: "ID", name: "Indonesia" },
	{ code: "IR", name: "Iran" },
	{ code: "IQ", name: "Iraq" },
	{ code: "IE", name: "Ireland" },
	{ code: "IL", name: "Israel" },
	{ code: "IT", name: "Italy" },
	{ code: "CI", name: "Ivory Coast" },
	{ code: "JM", name: "Jamaica" },
	{ code: "JP", name: "Japan" },
	{ code: "JO", name: "Jordan" },
	{ code: "KZ", name: "Kazakhstan" },
	{ code: "KE", name: "Kenya" },
	{ code: "KI", name: "Kiribati" },
	{ code: "KW", name: "Kuwait" },
	{ code: "KG", name: "Kyrgyzstan" },
	{ code: "LA", name: "Laos" },
	{ code: "LV", name: "Latvia" },
	{ code: "LB", name: "Lebanon" },
	{ code: "LS", name: "Lesotho" },
	{ code: "LR", name: "Liberia" },
	{ code: "LY", name: "Libya" },
	{ code: "LI", name: "Liechtenstein" },
	{ code: "LT", name: "Lithuania" },
	{ code: "LU", name: "Luxembourg" },
	{ code: "MK", name: "Macedonia" },
	{ code: "MG", name: "Madagascar" },
	{ code: "MW", name: "Malawi" },
	{ code: "MY", name: "Malaysia" },
	{ code: "MV", name: "Maldives" },
	{ code: "ML", name: "Mali" },
	{ code: "MT", name: "Malta" },
	{ code: "MH", name: "Marshall Islands" },
	{ code: "MR", name: "Mauritania" },
	{ code: "MU", name: "Mauritius" },
	{ code: "MX", name: "Mexico" },
	{ code: "FM", name: "Micronesia" },
	{ code: "MD", name: "Moldova" },
	{ code: "MC", name: "Monaco" },
	{ code: "MN", name: "Mongolia" },
	{ code: "ME", name: "Montenegro" },
	{ code: "MA", name: "Morocco" },
	{ code: "MZ", name: "Mozambique" },
	{ code: "MM", name: "Myanmar" },
	{ code: "NA", name: "Namibia" },
	{ code: "NR", name: "Nauru" },
	{ code: "NP", name: "Nepal" },
	{ code: "NL", name: "Netherlands" },
	{ code: "NZ", name: "New Zealand" },
	{ code: "NI", name: "Nicaragua" },
	{ code: "NE", name: "Niger" },
	{ code: "NG", name: "Nigeria" },
	{ code: "KP", name: "North Korea" },
	{ code: "NO", name: "Norway" },
	{ code: "OM", name: "Oman" },
	{ code: "PK", name: "Pakistan" },
	{ code: "PW", name: "Palau" },
	{ code: "PS", name: "Palestine" },
	{ code: "PA", name: "Panama" },
	{ code: "PG", name: "Papua New Guinea" },
	{ code: "PY", name: "Paraguay" },
	{ code: "PE", name: "Peru" },
	{ code: "PH", name: "Philippines" },
	{ code: "PL", name: "Poland" },
	{ code: "PT", name: "Portugal" },
	{ code: "QA", name: "Qatar" },
	{ code: "RO", name: "Romania" },
	{ code: "RU", name: "Russia" },
	{ code: "RW", name: "Rwanda" },
	{ code: "KN", name: "Saint Kitts and Nevis" },
	{ code: "LC", name: "Saint Lucia" },
	{ code: "VC", name: "Saint Vincent and the Grenadines" },
	{ code: "WS", name: "Samoa" },
	{ code: "SM", name: "San Marino" },
	{ code: "ST", name: "Sao Tome and Principe" },
	{ code: "SA", name: "Saudi Arabia" },
	{ code: "SN", name: "Senegal" },
	{ code: "RS", name: "Serbia" },
	{ code: "SC", name: "Seychelles" },
	{ code: "SL", name: "Sierra Leone" },
	{ code: "SG", name: "Singapore" },
	{ code: "SK", name: "Slovakia" },
	{ code: "SI", name: "Slovenia" },
	{ code: "SB", name: "Solomon Islands" },
	{ code: "SO", name: "Somalia" },
	{ code: "ZA", name: "South Africa" },
	{ code: "KR", name: "South Korea" },
	{ code: "SS", name: "South Sudan" },
	{ code: "ES", name: "Spain" },
	{ code: "LK", name: "Sri Lanka" },
	{ code: "SD", name: "Sudan" },
	{ code: "SR", name: "Suriname" },
	{ code: "SZ", name: "Swaziland" },
	{ code: "SE", name: "Sweden" },
	{ code: "CH", name: "Switzerland" },
	{ code: "SY", name: "Syria" },
	{ code: "TW", name: "Taiwan" },
	{ code: "TJ", name: "Tajikistan" },
	{ code: "TZ", name: "Tanzania" },
	{ code: "TH", name: "Thailand" },
	{ code: "TL", name: "Timor-Leste" },
	{ code: "TG", name: "Togo" },
	{ code: "TO", name: "Tonga" },
	{ code: "TT", name: "Trinidad and Tobago" },
	{ code: "TN", name: "Tunisia" },
	{ code: "TR", name: "Turkey" },
	{ code: "TM", name: "Turkmenistan" },
	{ code: "TV", name: "Tuvalu" },
	{ code: "UG", name: "Uganda" },
	{ code: "UA", name: "Ukraine" },
	{ code: "AE", name: "United Arab Emirates" },
	{ code: "GB", name: "United Kingdom" },
	{ code: "US", name: "United States" },
	{ code: "UY", name: "Uruguay" },
	{ code: "UZ", name: "Uzbekistan" },
	{ code: "VU", name: "Vanuatu" },
	{ code: "VA", name: "Vatican City" },
	{ code: "VE", name: "Venezuela" },
	{ code: "VN", name: "Vietnam" },
	{ code: "YE", name: "Yemen" },
	{ code: "ZM", name: "Zambia" },
	{ code: "ZW", name: "Zimbabwe" },
];

export default function SimpleSignUp() {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [country, setCountry] = useState("");
	const [emailError, setEmailError] = useState("");
	const [formError, setFormError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const recaptchaRef = useRef<ReCAPTCHA>(null);

	useEffect(() => {
		// Fetch country from Vercel geo headers
		const fetchCountry = async () => {
			try {
				const response = await fetch("/api/geo");
				const data = await response.json();
				if (data.country) {
					// Convert country code to country name
					const countryData = countries.find((c) => c.code === data.country);
					if (countryData) {
						setCountry(countryData.name);
					}
				}
			} catch (error) {
				console.error("Failed to fetch country:", error);
			}
		};

		if (open && !country) {
			fetchCountry();
		}
	}, [open, country]);

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubscribeClick = () => {
		const emailInput = document.getElementById(
			"email-address",
		) as HTMLInputElement;
		const emailValue = emailInput?.value || "";

		if (!emailValue) {
			setEmailError("Email address is required");
			return;
		}

		if (!validateEmail(emailValue)) {
			setEmailError("Please enter a valid email address");
			return;
		}

		setEmail(emailValue);
		setEmailError("");
		setOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormError("");

		if (!firstName.trim()) {
			setFormError("First name is required");
			return;
		}

		if (!country) {
			setFormError("Please select a country");
			return;
		}

		// Verify reCAPTCHA
		const recaptchaValue = recaptchaRef.current?.getValue();
		if (!recaptchaValue) {
			setFormError("Please complete the reCAPTCHA verification");
			return;
		}

		setIsSubmitting(true);

		try {
			// Submit to backend API
			const response = await fetch("/api/subscribe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					firstName,
					country,
					recaptchaToken: recaptchaValue,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Subscription failed");
			}

			// Send GTM event
			if (typeof window !== "undefined" && window.dataLayer) {
				window.dataLayer.push({
					event: "signup",
					email: email,
					country: country,
				});
			}

			// Success! Reset and close
			setOpen(false);
			setFirstName("");
			setCountry("");
			setEmail("");
			recaptchaRef.current?.reset();

			// Redirect to thank you page
			window.location.href = "https://hopeforjustice.org/thank-you/";
		} catch (error: unknown) {
			console.error("Submission error:", error);
			const errorMessage =
				error instanceof Error
					? error.message
					: "An error occurred. Please try again.";
			setFormError(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			<div className="mt-6 flex max-w-md gap-x-4">
				<label htmlFor="email-address" className="sr-only">
					Email address
				</label>
				<input
					id="email-address"
					name="email"
					type="email"
					placeholder="Enter your email"
					autoComplete="email"
					className="font-apercu min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-hfj-black sm:text-sm/6"
				/>
				<button
					onClick={handleSubscribeClick}
					type="button"
					className="flex-none rounded-md bg-hfj-red px-3.5 py-2.5 text-sm font-apercu font-semibold text-white shadow-xs hover:bg-hfj-red-tint1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hfj-red cursor-pointer"
				>
					Subscribe
				</button>
			</div>
			{emailError && <p className="mt-2 text-sm text-hfj-red">{emailError}</p>}
			<Dialog
				open={open}
				onClose={setOpen}
				className="relative z-100 font-apercu"
			>
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
				/>

				<div className="fixed inset-0 z-100 w-screen overflow-y-auto">
					<div className="flex min-h-full items-start justify-center p-4 text-center sm:items-start sm:p-0">
						<DialogPanel
							transition
							className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-md sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
						>
							<div>
								<div className="mt-2 text-left sm:mt-5">
									<DialogTitle className="text-xl sm:text-2xl font-canela leading-snug text-gray-900">
										Just a few more details to make sure we send you the most
										relevant content:
									</DialogTitle>
									<form onSubmit={handleSubmit} className="mt-6 space-y-4">
										{/* Hidden email field */}
										<input type="hidden" name="email" value={email} />

										{/* First name field */}
										<div>
											<label
												htmlFor="firstName"
												className="block text-sm font-medium text-gray-900"
											>
												First Name *
											</label>
											<input
												type="text"
												id="firstName"
												value={firstName}
												onChange={(e) => {
													const value = e.target.value;
													setFirstName(
														value.charAt(0).toUpperCase() + value.slice(1),
													);
												}}
												required
												className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-hfj-black sm:text-sm/6"
												placeholder="Enter your first name"
											/>
										</div>

										{/* Country dropdown */}
										<CountrySelect
											value={country}
											onChange={setCountry}
											countries={countries}
											required
										/>
										{/* reCAPTCHA */}
										<div className="pt-2">
											<ReCAPTCHA
												ref={recaptchaRef}
												sitekey={
													process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
													"YOUR_RECAPTCHA_SITE_KEY"
												}
											/>
										</div>

										{formError && (
											<p className="text-sm text-hfj-red">{formError}</p>
										)}

										<div className="mb-5 mt-5 sm:mt-6">
											<p className="text-xs text-hfj-black-tint1 mt-4">
												Submit this form if you wish Hope for Justice to send
												you emails to keep you informed of our ongoing
												activities, news, campaigns and appeals; and to invite
												you to events we think might interest you. You can
												unsubscribe at any time. We will always store your
												personal information securely. For details see our{" "}
												<Link
													className="underline"
													href="https://hopeforjustice.org/privacy"
												>
													Privacy Policy.
												</Link>
											</p>
										</div>
										<div className="sm:mt-6">
											<button
												type="submit"
												disabled={isSubmitting}
												className="inline-flex w-full justify-center rounded-md bg-hfj-red px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-hfj-red-tint1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hfj-red cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
											>
												{isSubmitting ? "Submitting..." : "Submit"}
											</button>
										</div>
									</form>
								</div>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</div>
	);
}
