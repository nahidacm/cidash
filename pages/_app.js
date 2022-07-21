import Template from "../components/Template";
import "../styles/antd.less";
import "../styles/globals.less";
import SocketContextProvider from "../contexts/socket";

function MyApp({ Component, pageProps }) {
    return (
        <Template>
            <SocketContextProvider>
                <Component {...pageProps} />
            </SocketContextProvider>
        </Template>
    );
}

export default MyApp;
