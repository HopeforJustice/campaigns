"use client";

import { useState, useEffect } from "react";

/**
 * Returns the ISO 3166-1 alpha-2 country code detected from the user's geo
 * location via /api/geo. Returns null while loading or if detection fails.
 *
 * The ?country=XX query param on the current page can be used to override
 * the detected country for testing purposes.
 */
export function useGeoCountry(): string | null {
	const [countryCode, setCountryCode] = useState<string | null>(null);

	useEffect(() => {
		const fetchCountry = async () => {
			try {
				const pageCountry = new URLSearchParams(window.location.search).get(
					"country",
				);
				const geoUrl = pageCountry
					? `/api/geo?country=${encodeURIComponent(pageCountry)}`
					: "/api/geo";
				const res = await fetch(geoUrl);
				const data = await res.json();
				setCountryCode(data.country ?? null);
			} catch {
				setCountryCode(null);
			}
		};
		fetchCountry();
	}, []);

	return countryCode;
}
