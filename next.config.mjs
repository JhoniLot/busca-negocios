/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Subpasta para o GitHub Pages (https://jhonilot.github.io/busca-negocios)
  basePath: process.env.NODE_ENV === 'production' ? '/busca-negocios' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/busca-negocios/' : '',
};

export default nextConfig;
