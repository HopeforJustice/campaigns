import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("X-Forwarded-Host", "campaigns.hopeforjustice.org");
	requestHeaders.set(
		"X-Forwarded-For",
		request.headers.get("x-forwarded-for") || "",
	);
	requestHeaders.set(
		"Cache-Control",
		request.headers.get("cache-control") || "",
	);

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

export const config = {
	matcher: "/:path*",
};
