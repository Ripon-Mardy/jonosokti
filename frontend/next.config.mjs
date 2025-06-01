/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains : ['jonosokti-backend.s3.ap-south-1.amazonaws.com', '147.79.70.5'],
        remotePatterns : [
            {
                protocol : 'https',
                hostname : 'jonosokti-backend.s3.ap-south-1.amazonaws.com',
                port : '',
                pathname : '/**',
            },
             {
                protocol : 'https',
                hostname : '147.79.70.5',
                port : '',
                pathname : '/**',
            },

        ]
    },
    env : {
        NEXT_PUBLIC_JONOSOKTI_API_URL : process.env.NEXT_PUBLIC_JONOSOKTI_API_URL   
    },
};

export default nextConfig;
