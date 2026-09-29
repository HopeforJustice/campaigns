import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,
	trailingSlash: true,
	async rewrites() {
		return {
			beforeFiles: [
				{
					source: "/wp-admin",
					destination:
						"https://testfall.wpenginepowered.com/wp-admin/index.php",
				},
				{
					source: "/wp-admin/",
					destination:
						"https://testfall.wpenginepowered.com/wp-admin/index.php",
				},
			],
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
