import axios from 'axios'

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload'
const UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET'

// To convert image URI to Blob
const uriToBlob = async (uri: string): Promise<Blob> => {
  const response = await fetch(uri)
  const blob = await response.blob()
  return blob
}

export const uploadImageToCloudinary = async (imageUri: string): Promise<string> => {
  try {
    const blob = await uriToBlob(imageUri)

    const formData = new FormData()
    formData.append('file', blob, 'image.jpg')
    formData.append('upload_preset', UPLOAD_PRESET)

    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return response.data.secure_url
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}
