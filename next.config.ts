import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,
	trailingSlash: true,
	async rewrites() {
		return {
			beforeFiles: [],
			afterFiles: [],
			fallback: [
				{
					source: "/:path*",
					destination: "https://hopeforjustice.org/:path*",
				},
			],
		};
	},
};

export default nextConfig;
