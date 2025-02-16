const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (file) => {
    try {
        if (!file) throw new Error('No file provided');

        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "video",
            folder: "solution_videos", 
            allowed_formats: ["mp4", "mov", "avi", "mkv"],
            chunk_size: 6000000, 
            eager: [
                { format: 'mp4', quality: 'auto' } 
            ],
            eager_async: true
        });

        return {
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            duration: result.duration
        };
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw new Error('Failed to upload video to cloud storage');
    }
};

const deleteFromCloudinary = async (public_id) => {
    try {
        if (!public_id) throw new Error('No public_id provided');
        const result = await cloudinary.uploader.destroy(public_id, { resource_type: "video" });
        return result;
    } catch (error) {
        console.error('Cloudinary Delete Error:', error);
        throw new Error('Failed to delete video from cloud storage');
    }
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary
};
