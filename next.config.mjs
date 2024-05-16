/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_IS_LOCAL: process.env.NEXT_PUBLIC_IS_LOCAL || "false",
    },
};

export default nextConfig;
