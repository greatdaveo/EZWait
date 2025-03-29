import axios from 'axios'
import { CLOUDINARY_URL, UPLOAD_PRESET } from '@env'

// Convert local image URI to blob
const uriToBlob = async (uri: string): Promise<Blob> => {
  const response = await fetch(uri)
  const blob = await response.blob()
  return blob
}

export const uploadImageToCloudinary = async (imageUri: string): Promise<string> => {
  try {
    const blob = await uriToBlob(imageUri)

    const formData = new FormData()
    formData.append('file', blob)
    formData.append('upload_preset', UPLOAD_PRESET)

    const response = await axios.post(CLOUDINARY_URL, formData)

    console.log('Uploading to:', CLOUDINARY_URL)
    console.log('Upload preset:', UPLOAD_PRESET)
    console.log('Image URI:', imageUri)

    console.log('Uploaded Image URL:', response.data.secure_url)
    return response.data.secure_url
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}
