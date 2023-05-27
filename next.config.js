/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains:['hbquufifeyxhbytyjvmu.supabase.co','https://hbquufifeyxhbytyjvmu.supabase.co/storage/v1/render/image/public/files/','res.cloudinary.com']
  }
}

module.exports = nextConfig
