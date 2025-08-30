// import { v2 as cloudinary } from 'cloudinary';
// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function uploadImage(file) {
//   try {
//     const result = await cloudinary.uploader.upload(file, {
//       folder: 'Home',
//       resource_type: 'image',
//     });
//     return result.secure_url;
//   } catch (error) {
//     throw new Error('Failed to upload image to Cloudinary');
//   }
// }

// export async function deleteImage(publicId) {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     throw new Error('Failed to delete image from Cloudinary');
//   }
// }



import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a single image to Cloudinary
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
export async function uploadImage(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'Home',
      resource_type: 'image',
    });
    return result.secure_url;
  } catch (error) {
    throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
  }
}

/**
 * Uploads multiple images to Cloudinary
 * @param {FileList | File[]} files - Array or FileList of image files to upload
 * @returns {Promise<string[]>} - Array of secure URLs for uploaded images
 */
export async function uploadImages(files) {
  try {
    const uploadPromises = Array.from(files).map(file =>
      cloudinary.uploader.upload(file, {
        folder: 'Home',
        resource_type: 'image',
      })
    );
    const results = await Promise.all(uploadPromises);
    return results.map(result => result.secure_url);
  } catch (error) {
    throw new Error(`Failed to upload images to Cloudinary: ${error.message}`);
  }
}

/**
 * Deletes a single image from Cloudinary
 * @param {string} publicId - The public ID of the image to delete
 * @returns {Promise<void>}
 */
export async function deleteImage(publicId) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error(`Failed to delete image from Cloudinary: ${error.message}`);
  }
}

/**
 * Deletes multiple images from Cloudinary
 * @param {string[]} publicIds - Array of public IDs of images to delete
 * @returns {Promise<void>}
 */
export async function deleteImages(publicIds) {
  try {
    const deletePromises = publicIds.map(publicId =>
      cloudinary.uploader.destroy(publicId)
    );
    await Promise.all(deletePromises);
  } catch (error) {
    throw new Error(`Failed to delete images from Cloudinary: ${error.message}`);
  }
}