/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains : ['jonosokti-backend.s3.ap-south-1.amazonaws.com']
    },
    env : {
        NEXT_PUBLIC_JONOSOKTI_API_URL : process.env.NEXT_PUBLIC_JONOSOKTI_API_URL   
    },
};

export default nextConfig;
