"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useGeoCountry } from "@/app/hooks/useGeoCountry";

// ─── Types ────────────────────────────────────────────────────────────────────

type CurrencyCode = "GBP" | "USD" | "AUD" | "EUR" | "NOK";

interface AmountOption {
	amount: number;
	label: string;
	reason: string;
}

interface CurrencyConfig {
	symbol: string;
	code: CurrencyCode;
	amounts: AmountOption[];
	customReason: string;
	symbolAfter?: boolean;
}

export interface GivingWidgetProps {
	textColor?: string;
	buttonColor?: string;
	buttonTextColor?: string;
	selectedButtonColor?: string;
	campaign?: string;
	defaultSelectedIndex?: number;
	amountOverrides?: Partial<Record<CurrencyCode, CurrencyConfig>>;
	tagline?: string;
	matchFunding?: boolean;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const REASONS = [
	"could go towards a care package of essentials for a survivor of human trafficking",
	"could provide a hot meal and a change of clothes on the day of rescue",
	"could provide the first good night's sleep in emergency accommodation for an adult victim",
	"could provide medical care and medicine for 15 children at one of our Lighthouses",
	"could provide an aftercare intervention that changes a survivor's whole future",
];

const CUSTOM_REASON =
	"Your gift could help identify victims, support survivors and prevent exploitation.";

function buildAmounts(
	amounts: number[],
	symbol: string,
	symbolAfter = false,
): AmountOption[] {
	return amounts.map((amount, i) => ({
		amount,
		label: symbolAfter ? `${amount} ${symbol}` : `${symbol}${amount}`,
		reason: REASONS[i],
	}));
}

const DEFAULT_CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
	GBP: {
		symbol: "£",
		code: "GBP",
		amounts: buildAmounts([10, 25, 50, 100, 250], "£"),
		customReason: CUSTOM_REASON,
	},
	USD: {
		symbol: "$",
		code: "USD",
		amounts: buildAmounts([10, 25, 50, 100, 250], "$"),
		customReason: CUSTOM_REASON,
	},
	AUD: {
		symbol: "A$",
		code: "AUD",
		amounts: buildAmounts([10, 25, 50, 100, 250], "A$"),
		customReason: CUSTOM_REASON,
	},
	EUR: {
		symbol: "€",
		code: "EUR",
		amounts: buildAmounts([10, 25, 50, 100, 250], "€"),
		customReason: CUSTOM_REASON,
	},
	NOK: {
		symbol: "kr",
		code: "NOK",
		symbolAfter: true,
		amounts: buildAmounts([100, 250, 500, 1000, 2500], "kr", true),
		customReason: CUSTOM_REASON,
	},
};

// ─── Country → Currency mapping ───────────────────────────────────────────────

const USD_COUNTRIES = new Set([
	"AG",
	"AR",
	"BS",
	"BB",
	"BZ",
	"BO",
	"BR",
	"KH",
	"CA",
	"CL",
	"CO",
	"CR",
	"DM",
	"EC",
	"SV",
	"GF",
	"GD",
	"GP",
	"GT",
	"GY",
	"HT",
	"HN",
	"JM",
	"MQ",
	"MX",
	"NI",
	"PA",
	"PY",
	"PE",
	"PR",
	"LC",
	"VC",
	"SR",
	"TT",
	"US",
	"UY",
	"VE",
	"VI",
]);

const AUD_COUNTRIES = new Set([
	"AU",
	"NZ",
	"PG",
	"FJ",
	"WS",
	"TO",
	"VU",
	"SB",
	"CK",
	"NR",
	"TV",
	"PF",
	"NC",
]);

const EUR_COUNTRIES = new Set([
	"AT",
	"BE",
	"CY",
	"EE",
	"FI",
	"FR",
	"DE",
	"GR",
	"IE",
	"IT",
	"LV",
	"LT",
	"LU",
	"MT",
	"NL",
	"PT",
	"SK",
	"SI",
	"ES",
	"SE",
	"DK",
	"PL",
	"CZ",
	"HU",
	"RO",
	"BG",
	"CH",
	"IS",
	"AL",
	"BA",
	"ME",
	"RS",
	"MK",
	"XK",
	"MC",
	"LI",
	"SM",
	"VA",
	"AD",
]);

function getCountryCurrency(country: string | null): CurrencyCode {
	if (!country) return "GBP";
	if (country === "GB") return "GBP";
	if (country === "NO") return "NOK";
	if (USD_COUNTRIES.has(country)) return "USD";
	if (AUD_COUNTRIES.has(country)) return "AUD";
	if (EUR_COUNTRIES.has(country)) return "EUR";
	return "GBP";
}

// ─── Currency modal options ───────────────────────────────────────────────────

const CURRENCY_OPTIONS: { code: CurrencyCode; label: string }[] = [
	{ code: "GBP", label: "£ GBP" },
	{ code: "USD", label: "$ USD" },
	{ code: "AUD", label: "A$ AUD" },
	{ code: "EUR", label: "€ EUR" },
	{ code: "NOK", label: "kr NOK" },
];

// ─── Pure helper ─────────────────────────────────────────────────────────────

function mergeCurrency(
	code: CurrencyCode,
	overrides?: Partial<Record<CurrencyCode, CurrencyConfig>>,
): CurrencyConfig {
	const base = DEFAULT_CURRENCIES[code];
	const override = overrides?.[code];
	return override ? { ...base, ...override } : base;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GivingWidget({
	textColor = "black",
	buttonColor = "black",
	buttonTextColor = "white",
	selectedButtonColor = "#D6001C",
	campaign,
	defaultSelectedIndex = 2,
	amountOverrides,
	matchFunding = false,
	tagline = "Your gift could make the difference. You could bring someone their freedom.",
}: GivingWidgetProps) {
	// Clamp default to valid preset range (0–4); 5 is reserved for Custom
	const resolvedDefault = Math.min(
		Math.max(Math.floor(defaultSelectedIndex), 0),
		4,
	);

	const [selectedIndex, setSelectedIndex] = useState<number>(resolvedDefault);
	const [customAmount, setCustomAmount] = useState("");
	const [currencyConfig, setCurrencyConfig] = useState<CurrencyConfig>(
		DEFAULT_CURRENCIES.GBP,
	);
	const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
	const searchParams = useSearchParams();

	const detectedCountry = useGeoCountry();

	// Update currency when geo detection resolves (runs once)
	useEffect(() => {
		const code = getCountryCurrency(detectedCountry);
		setCurrencyConfig(mergeCurrency(code, amountOverrides));
		// amountOverrides intentionally omitted — geo runs once on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detectedCountry]);

	const handleCurrencySelect = (code: CurrencyCode) => {
		setCurrencyConfig(mergeCurrency(code, amountOverrides));
		setSelectedIndex(resolvedDefault);
		setCustomAmount("");
		setIsCurrencyModalOpen(false);
	};

	// ─── Derived values ────────────────────────────────────────────────────────

	const isCustomSelected = selectedIndex === 5;

	const currentAmountValue = isCustomSelected
		? customAmount
		: String(currencyConfig.amounts[selectedIndex]?.amount ?? "");

	const currentLabel = isCustomSelected
		? customAmount
			? currencyConfig.symbolAfter
				? `${customAmount} ${currencyConfig.symbol}`
				: `${currencyConfig.symbol}${customAmount}`
			: ""
		: (currencyConfig.amounts[selectedIndex]?.label ?? "");

	const currentReason = isCustomSelected
		? currencyConfig.customReason
		: (currencyConfig.amounts[selectedIndex]?.reason ?? "");

	const doubledLabel = (() => {
		if (!matchFunding) return null;
		if (isCustomSelected) {
			if (!customAmount || Number(customAmount) <= 0) return null;
			const doubled = Number(customAmount) * 2;
			return currencyConfig.symbolAfter
				? `${doubled} ${currencyConfig.symbol}`
				: `${currencyConfig.symbol}${doubled}`;
		}
		const amount = currencyConfig.amounts[selectedIndex]?.amount;
		if (amount == null) return null;
		const doubled = amount * 2;
		return currencyConfig.symbolAfter
			? `${doubled} ${currencyConfig.symbol}`
			: `${currencyConfig.symbol}${doubled}`;
	})();

	const isValidAmount = isCustomSelected
		? !!customAmount && Number(customAmount) > 0
		: selectedIndex >= 0 && selectedIndex <= 4;

	const donateUrl = (() => {
		if (!isValidAmount) return "#";
		const parts = [`amount=${encodeURIComponent(currentAmountValue)}`];
		parts.push(`currency=${currencyConfig.code.toLowerCase()}`);
		if (campaign) parts.push(`campaign=${encodeURIComponent(campaign)}`);
		for (const key of ["tlxs", "tlxc", "tlxm"] as const) {
			const value = searchParams.get(key);
			if (value) parts.push(`${key}=${encodeURIComponent(value)}`);
		}
		parts.push("givingFrequency=once");
		return `https://donate.hopeforjustice.org/?${parts.join("&")}`;
	})();

	// ─── Render ────────────────────────────────────────────────────────────────

	return (
		<div className="w-full space-y-4 lg:space-y-6">
			{/* Tagline */}
			<p
				className="text-lg xl:text-2xl text-center leading-snug font-bold"
				style={{ color: textColor }}
			>
				{tagline}
			</p>

			{/* Amount grid — 5 presets + Custom = 3×2 */}
			<div className="grid grid-cols-3 gap-3">
				{currencyConfig.amounts.map((option, i) => (
					<button
						key={i}
						onClick={() => setSelectedIndex(i)}
						className="rounded-2xl py-6 text-3xl font-bold transition-opacity hover:opacity-90 cursor-pointer"
						style={{
							backgroundColor:
								selectedIndex === i ? selectedButtonColor : buttonColor,
							color: buttonTextColor,
						}}
					>
						{option.label}
					</button>
				))}
				<button
					onClick={() => setSelectedIndex(5)}
					className="rounded-2xl py-6 px-2 text-lg font-bold leading-tight transition-opacity hover:opacity-90 cursor-pointer"
					style={{
						backgroundColor: isCustomSelected
							? selectedButtonColor
							: buttonColor,
						color: buttonTextColor,
					}}
				>
					Custom amount
				</button>
			</div>

			{/* Custom amount input */}
			{isCustomSelected && (
				<div className="relative">
					{!currencyConfig.symbolAfter && (
						<span
							className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold pointer-events-none"
							style={{ color: textColor }}
						>
							{currencyConfig.symbol}
						</span>
					)}
					<input
						type="number"
						min="1"
						value={customAmount}
						onChange={(e) => setCustomAmount(e.target.value)}
						placeholder="Enter amount"
						className={clsx(
							"w-full rounded-2xl border-2 py-4 text-xl font-bold outline-none",
							currencyConfig.symbolAfter ? "pl-4 pr-14" : "pl-10 pr-4",
						)}
						style={{ borderColor: buttonColor, color: textColor }}
					/>
					{currencyConfig.symbolAfter && (
						<span
							className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold pointer-events-none"
							style={{ color: textColor }}
						>
							{currencyConfig.symbol}
						</span>
					)}
				</div>
			)}

			{/* Reason */}
			{currentReason && (
				<p
					className="text-base lg:text-lg text-center leading-snug"
					style={{ color: textColor }}
				>
					{!isCustomSelected && currentLabel && (
						<strong style={{ color: selectedButtonColor }}>
							{doubledLabel
								? `${currentLabel} doubled to ${doubledLabel}`
								: currentLabel}{" "}
						</strong>
					)}
					{currentReason}
				</p>
			)}

			{/* Donate button */}
			<div className="flex flex-col justify-center items-center">
				<a
					href={donateUrl}
					className={clsx(
						"block w-full rounded-xl py-5 text-center text-xl font-bold transition-opacity xl:text-2xl hover:opacity-90",
						!isValidAmount && "opacity-50 pointer-events-none",
					)}
					style={{
						backgroundColor: selectedButtonColor,
						color: buttonTextColor,
					}}
				>
					{currentLabel ? `Give ${currentLabel}` : "Select an amount"}
				</a>
				{matchFunding && doubledLabel && (
					<p
						className="text-sm text-center px-4 py-1 rounded-lg -mt-2 z-10"
						style={{ backgroundColor: buttonColor, color: buttonTextColor }}
					>
						Doubled to {doubledLabel}*
					</p>
				)}
			</div>

			{/* Change currency link */}
			<div className="text-center">
				<button
					onClick={() => setIsCurrencyModalOpen(true)}
					className="text-sm underline cursor-pointer bg-transparent border-none"
					style={{ color: textColor }}
				>
					Change currency
				</button>
			</div>

			{/* Currency selection modal */}
			<Dialog
				open={isCurrencyModalOpen}
				onClose={() => setIsCurrencyModalOpen(false)}
				className="relative z-50"
			>
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
				/>
				<div className="fixed inset-0 z-50 flex -mt-12 items-center justify-center p-4">
					<DialogPanel
						transition
						className="w-full max-w-sm rounded-2xl p-8 shadow-xl transition-all data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
						style={{ backgroundColor: "#ffffff" }}
					>
						<p className="text-xl font-bold mb-6 text-hfj-black text-center">
							Select currency
						</p>
						<div className="flex flex-wrap gap-3 justify-center">
							{CURRENCY_OPTIONS.map(({ code, label }) => (
								<button
									key={code}
									onClick={() => handleCurrencySelect(code)}
									className="rounded-xl px-4 py-3 text-left text-xl font-bold transition-opacity hover:opacity-90 cursor-pointer"
									style={{
										backgroundColor:
											currencyConfig.code === code
												? selectedButtonColor
												: buttonColor,
										color: buttonTextColor,
									}}
								>
									{label}
								</button>
							))}
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</div>
	);
}
