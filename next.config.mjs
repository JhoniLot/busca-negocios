/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Configuração para domínio próprio (poupai.store)
  // basePath e assetPrefix vazios para carregar recursos da raiz do domínio
  basePath: '',
};

export default nextConfig;
