// /** @type {import('next').NextConfig} */

// module.exports = {
//   images: {
//     domains: ["http://localhost:8080"],
//   },
// };

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080", // specify the port being used
        pathname: "/uploads/**", // specify the path pattern
      },
    ],
    domains: ["res.cloudinary.com"], // Add Cloudinary's hostname here
  },
};
