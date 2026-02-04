import Image from "next/image";
import Link from "next/link";

export default function Header() {
	return (
		<header className="relative">
			{/* logo */}
			<div className="absolute top-5 left-5 z-50 md:top-10 md:left-10">
				<Link href="https://hopeforjustice.org">
					<Image
						src="/logo.svg"
						width={227}
						height={67.9}
						className="block w-48 md:w-56"
						alt="Hope for Justice logo"
					/>
				</Link>
			</div>
		</header>
	);
}
