import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	// Allow spoofing country via ?country=XX query param
	const spoofed = request.nextUrl.searchParams.get("country");
	if (spoofed) {
		return NextResponse.json({ country: spoofed.toUpperCase() });
	}

	// Get country from Vercel's geo headers
	const country =
		(request as { geo?: { country?: string } }).geo?.country ||
		request.headers.get("x-vercel-ip-country");

	return NextResponse.json({
		country: country || null,
	});
}
