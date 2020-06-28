import { Cloudinary } from 'cloudinary-core';

const cloudinaryConfig = Cloudinary.new({
  cloud_name: 'phillips-assets',
  private_cdn: true,
  secure: true,
  secure_distribution: 'assets.phillips.com',
  cname: 'assets.phillips.com'
});

export default cloudinaryConfig;
