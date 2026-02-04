import DonorfyClient from "./donorfyClient";

// Initialize Donorfy clients for both regions
const donorfyUK = new DonorfyClient(
	process.env.DONORFY_UK_KEY,
	process.env.DONORFY_UK_TENANT,
);
const donorfyUS = new DonorfyClient(
	process.env.DONORFY_US_KEY,
	process.env.DONORFY_US_TENANT,
);
const donorfyROW = new DonorfyClient(
	process.env.DONORFY_ROW_KEY,
	process.env.DONORFY_ROW_TENANT,
);
const donorfySandbox = new DonorfyClient(
	process.env.DONORFY_SANDBOX_KEY,
	process.env.DONORFY_SANDBOX_TENANT,
);

export function getDonorfyClient(instance, forceLive = false) {
	if (
		forceLive === false &&
		(process.env.VERCEL_ENV !== "production" || instance === "sandbox")
	) {
		console.log("Using Donorfy Sandbox instance");
		return donorfySandbox;
	}
	if (instance === "us") {
		return donorfyUS;
	} else if (instance === "uk") {
		return donorfyUK;
	} else if (instance === "row") {
		return donorfyROW;
	} else {
		throw new Error(`Invalid Donorfy instance: ${instance}.`);
	}
}
