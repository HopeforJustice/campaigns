import { NextRequest, NextResponse } from "next/server";
import addUpdateSubscriber from "@/app/lib/mailchimp/addUpdateSubscriber";
import { getDonorfyClient } from "@/app/lib/donorfy/getDonorfyClient";

// Helper function to determine Donorfy instance based on country
function getDonorfyInstance(country: string): string {
	const usCountries = ["United States"];
	const ukCountries = ["United Kingdom"];

	if (usCountries.includes(country)) {
		return "us";
	} else if (ukCountries.includes(country)) {
		return "uk";
	} else {
		return "row"; // Rest of World
	}
}

// Helper function to get Mailchimp country code
function getMailchimpCountry(country: string): string {
	if (country === "United States") {
		return "us";
	} else if (country === "United Kingdom") {
		return "uk";
	}
	return "uk"; // Default to UK
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { email, firstName, country, recaptchaToken } = body;

		// Validate required fields
		if (!email || !firstName || !country) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		// Verify reCAPTCHA
		const recaptchaResponse = await fetch(
			"https://www.google.com/recaptcha/api/siteverify",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
			},
		);

		const recaptchaData = await recaptchaResponse.json();
		if (!recaptchaData.success) {
			return NextResponse.json(
				{ error: "reCAPTCHA verification failed" },
				{ status: 400 },
			);
		}

		// Step 1: Add/Update subscriber in Mailchimp
		const mailchimpCountry = getMailchimpCountry(country);
		try {
			await addUpdateSubscriber(
				email,
				firstName,
				"", // lastname
				"subscribed",
				mailchimpCountry,
			);
		} catch (mailchimpError: unknown) {
			console.error("Mailchimp error:", mailchimpError);
			// Continue even if Mailchimp fails
		}

		// Step 2: Process with Donorfy
		const donorfyInstance = getDonorfyInstance(country);
		const donorfy = getDonorfyClient(donorfyInstance);

		// Check for duplicate by email
		const duplicateCheckData = {
			EmailAddress: email,
		};

		let constituentId: string | null = null;
		const duplicateResult = await donorfy.duplicateCheck(duplicateCheckData);

		if (duplicateResult && duplicateResult.length > 0) {
			// Duplicate found - use existing constituent
			constituentId = duplicateResult[0].ConstituentId;
			console.log(`Duplicate found: ${constituentId}`);
		} else {
			// No duplicate - create new constituent
			const newConstituentData = {
				EmailAddress: email,
				FirstName: firstName,
				PreferredName: firstName,
				ConstituentType: "Individual",
				Country: country,
			};

			const newConstituent =
				await donorfy.createConstituent(newConstituentData);
			constituentId = newConstituent.ConstituentId;
			console.log(`New constituent created: ${constituentId}`);
		}

		// Step 3: Update preferences for the constituent
		if (constituentId) {
			const preferencesData = {
				PreferredChannel: "Email",
				PreferencesList: [
					{
						PreferenceType: "Channel",
						PreferenceName: "Email",
						PreferenceAllowed: "true",
					},
					{
						PreferenceType: "Purpose",
						PreferenceName: "Email Updates",
						PreferenceAllowed: "true",
					},
				],
			};

			await donorfy.updateConstituentPreferences(
				constituentId,
				preferencesData,
			);
			console.log(`Preferences updated for: ${constituentId}`);
		}

		return NextResponse.json(
			{
				success: true,
				message: "Successfully subscribed",
				constituentId,
			},
			{ status: 200 },
		);
	} catch (error: unknown) {
		console.error("Subscription error:", error);
		const errorMessage =
			error instanceof Error
				? error.message
				: "An error occurred during subscription";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
