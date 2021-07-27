import devConfig from './vite.dev.config';
import prodConfig from './vite.prod.config';

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
