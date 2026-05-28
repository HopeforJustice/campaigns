import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function Header({
	color = "default",
	link = "https://hopeforjustice.org",
	layout = "default",
	logoClassName = "block w-48 md:w-56",
}) {
	return (
		<header className="relative">
			<div
				className={clsx(
					layout === "default" &&
						"absolute top-5 left-5 z-50 md:top-10 md:left-10",
				)}
			>
				<Link href={link}>
					<Image
						src={color === "all-white" ? "/logo-all-white.svg" : "/logo.svg"}
						width={227}
						height={67.9}
						className={logoClassName}
						alt="Hope for Justice logo"
					/>
				</Link>
			</div>
		</header>
	);
}
