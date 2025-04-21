/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Disable canvas and encoding aliases
      config.resolve.alias.canvas = false;
      config.resolve.alias.encoding = false;
      checkCompatibility: false,
  
      // Add a rule to handle PDF files
      config.module.rules.push({
        test: /\.pdf$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'static/assets',
              publicPath: '/_next/static/assets',
            },
          },
        ],
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  