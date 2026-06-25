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
					destination:
						"https://webhook.site/c5c1f228-02dd-41da-a196-4b614bf9ff72/:path*",
				},
			],
		};
	},
};

export default nextConfig;
