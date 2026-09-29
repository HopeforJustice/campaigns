import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,
	trailingSlash: true,
	async rewrites() {
		return {
			fallback: [
				{
					source: "/:path*",
					destination: "https://testfall.wpenginepowered.com/:path*",
				},
			],
		};
	},
};

export default nextConfig;
