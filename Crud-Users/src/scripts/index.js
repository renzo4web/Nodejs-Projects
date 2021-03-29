import '../styles/index.scss';
import {init} from './user-page';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

init();
