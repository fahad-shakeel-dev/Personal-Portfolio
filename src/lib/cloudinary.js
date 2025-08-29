import { v2 as cloudinary } from 'cloudinary';
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'Home',
      resource_type: 'image',
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Failed to upload image to Cloudinary');
  }
}

export async function deleteImage(publicId) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('Failed to delete image from Cloudinary');
  }
}