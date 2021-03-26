import '../styles/index.scss';
import {init} from './joke-page';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

init();
