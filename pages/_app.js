import Template from "../components/Template";
import "../styles/antd.less";
import "../styles/globals.less";
import SocketResultContextProvider from "../contexts/SocketResultContext";

function MyApp({ Component, pageProps }) {
    return (
        <SocketResultContextProvider>
            <Template>
                <Component {...pageProps} />
            </Template>
        </SocketResultContextProvider>
    );
}

export default MyApp;
