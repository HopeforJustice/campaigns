import { ChevronDownIcon } from "@heroicons/react/16/solid";

interface CountryOption {
	code: string;
	name: string;
}

interface CountrySelectProps {
	value: string;
	onChange: (value: string) => void;
	countries: CountryOption[];
	required?: boolean;
}

export default function CountrySelect({
	value,
	onChange,
	countries,
	required = false,
}: CountrySelectProps) {
	return (
		<>
			<label
				htmlFor="country"
				className="block text-sm/6 font-medium text-gray-900 mb-0"
			>
				Country {required && "*"}
			</label>
			<div className="grid grid-cols-1 mt-2">
				<select
					id="country"
					name="country"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					required={required}
					className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-hfj-black sm:text-sm/6"
				>
					<option value="">Select your country</option>
					{countries.map((country) => (
						<option key={country.code} value={country.name}>
							{country.name}
						</option>
					))}
				</select>
				<ChevronDownIcon
					aria-hidden="true"
					className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
				/>
			</div>
		</>
	);
}
