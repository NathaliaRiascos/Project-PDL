import '../styles/globals.css';
import 'antd/dist/antd.css';
import '../styles/layout.css';
import '../styles/cotizacion.css';
import '../styles/ordenDeServicio.css';
import Layout from '../components/constants/layout';


function MyApp({ Component, pageProps }) {
  return <>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
}

export default MyApp
