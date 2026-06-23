import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,
	async rewrites() {
		return {
			beforeFiles: [],
			afterFiles: [],
			fallback: [
				{
					source: "/:path*",
					destination: "https://hfj2.wpenginepowered.com/:path*",
				},
			],
		};
	},
};

export default nextConfig;
