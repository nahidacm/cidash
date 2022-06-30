import Template from '../components/Template';
import "../styles/antd.less";
import '../styles/globals.less'

function MyApp({ Component, pageProps }) {
  return (
    <Template>
      <Component {...pageProps} />
    </Template>
  )
}

export default MyApp
