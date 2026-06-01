export default function sendGTMEvent(
	eventName: string,
	eventData?: Record<string, string | number | boolean>,
) {
	if (typeof window === "undefined") return; // Ensure this runs only on the client side
	if (!window.dataLayer) {
		window.dataLayer = [];
	}
	// Send GTM event
	if (typeof window !== "undefined" && window.dataLayer) {
		window.dataLayer.push({
			event: eventName,
			...eventData,
		});
	}
}
