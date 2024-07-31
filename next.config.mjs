/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["app"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "cqymdrdintwoglihgmrq.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/posts/**",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        port: "",
        pathname:
          "/dms/image/D4D12AQFArAr67RlJHw/article-cover_image-shrink_600_2000/**",
      },
    ],
  },
};

//media.licdn.com/dms/image/D4D12AQFArAr67RlJHw/article-cover_image-shrink_600_2000/0/1686075264316?e=2147483647&v=beta&t=YjP2JZtcryjzGHs9VRNKoCMKVR0PET-cCzQbn3gAmi8
export default nextConfig;
