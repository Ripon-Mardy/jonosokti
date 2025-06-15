/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains : ['jonosokti-backend.s3.ap-south-1.amazonaws.com', '147.79.70.5']
    },
    env : {
        ADMIN_URL : process.env.ADMIN_URL
    }
};

export default nextConfig;
