import { v2 } from 'cloudinary';
import { CLOUDINARY } from 'src/constants';


export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'xxavierargentino',
      api_key: '876447129776254',
      api_secret: 'tapHwHsGnIWw9x3Q0OZacVpD8j4',
    });
  },
};