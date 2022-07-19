import styles from "../styles/Home.module.less";
import { useEffect } from "react";
import io from 'socket.io-client';
let socket;

const Home = () => {

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    });

    socket.on('update-input', msg => {
      console.log("msg: ", msg);
    });
  }

  return (
    <div
      className="site-layout-background"
      style={{
        padding: 24,
        minHeight: 360,
      }}
    >
      Bill is a cat.
    </div>
  );
};

export default Home;
