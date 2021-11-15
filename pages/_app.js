import '../styles/globals.css'
import { Provider } from 'react-redux';
// import withRedux from 'next-redux-wrapper';
import store from '../redux/store';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

function MyApp({ Component, pageProps }) {

  return ( 
  <Provider store = {store}>
  <Component {...pageProps} />
  </Provider>
  )
}

export default  MyApp
