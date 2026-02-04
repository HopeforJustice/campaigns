import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	// Get country from Vercel's geo headers
	const country =
		(request as { geo?: { country?: string } }).geo?.country ||
		request.headers.get("x-vercel-ip-country");

	return NextResponse.json({
		country: country || null,
	});
}
