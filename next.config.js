const {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require('next/dist/shared/lib/constants')

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {

  const isProd = (
    process.env.NODE_ENV === 'production'
    || phase === PHASE_PRODUCTION_BUILD
    || phase === PHASE_PRODUCTION_SERVER
  );

  return {
    distDir: isProd ? '.next.prod' : '.next.dev',
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.discordapp.com',
          port: '',
          pathname: '**',
        }
      ]
    }
  }
}

module.exports = nextConfig
