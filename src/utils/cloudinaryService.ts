import { CLOUD_NAME, UPLOAD_PRESET } from '@env'
import { upload } from 'cloudinary-react-native'
import { Cloudinary } from '@cloudinary/url-gen'

export const uploadImageToCloudinary = async (imageUri: string): Promise<string> => {
  try {
    const cld = new Cloudinary({
      cloud: {
        cloudName: CLOUD_NAME
      },
      url: {
        secure: true
      }
    })

    const options = {
      upload_preset: UPLOAD_PRESET,
      unsigned: true
    }
    return new Promise((resolve, reject) => {
      upload(cld, {
        file: imageUri,
        options,
        callback: (error: any, response: any) => {
          if (error) {
            console.error('Error uploading image: ', error)
            reject(error)
          } else {
            console.log('Uploaded Image URL: ', response.secure_url)
            resolve(response.secure_url)
          }
        }
      })
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}
