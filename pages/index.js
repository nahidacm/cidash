import { useEffect, useState } from "react";
import io from 'socket.io-client';
let socket = io();

const Home = () => {
  // States
  const [socketConnected, setSocketConnected] = useState(false);

  const turnSocketOn = async () => {
      let response = await fetch("/api/socket");

      if (response?.status === 200) {
          setSocketConnected(true);
      }
  };

  const turnOnPTYProcess = async() => {
    let response = await fetch("/api/pty");
  }

  useEffect(() => {
      // Turn socket connection on on first page load
      turnSocketOn();
      // turnOnPTYProcess();
  }, []);

  useEffect(() => {
      if (socketConnected) {
          socket.on("connect", () => {
              console.log("connected");
          });

          socket.on("command-output", (msg) => {
              console.log("command-output: ", msg);
          });
      }
  }, [socketConnected]);


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
