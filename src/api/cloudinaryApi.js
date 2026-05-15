export const uploadImageToCloudinary = async (file) => {
  const cloudinaryData = new FormData();
  cloudinaryData.append("file", file);
  cloudinaryData.append("upload_preset", "Upload_profileImage"); 
  
  const response = await fetch(`https://api.cloudinary.com/v1_1/dujgscgo0/image/upload`, {
    method: "POST",
    body: cloudinaryData,
  });

  if (!response.ok) {
    throw new Error("Failed to reach Cloudinary");
  }
  //presigned upload

  const cloudJson = await response.json();
  
  if (!cloudJson.secure_url) {
    throw new Error("Failed to upload image to Cloudinary");
  }
  
  return cloudJson.secure_url; 
};