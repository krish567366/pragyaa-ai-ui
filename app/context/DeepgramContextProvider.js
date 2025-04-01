"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";
import { getApiKey, sendKeepAliveMessage } from "app/utils/deepgramUtils";

const DeepgramContext = createContext();

const DeepgramContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [socketState, setSocketState] = useState(-1);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [rateLimited, setRateLimited] = useState(false);
  const keepAlive = useRef();
  const maxReconnectAttempts = 5;

  const connectToDeepgram = async () => {
    console.log("Attempting to connect to Deepgram...");
    if (reconnectAttempts >= maxReconnectAttempts) {
      console.log("Max reconnect attempts reached.");
      setRateLimited(true);
      return;
    }

    setSocketState(0); // connecting

    try {
      const apiKey = await getApiKey();
      console.log("Got API key, creating WebSocket connection...");
      
      const newSocket = new WebSocket("wss://agent.deepgram.com/agent", [
        "token",
        apiKey,
      ]);

      const onOpen = () => {
        setSocketState(1); // connected
        setReconnectAttempts(0); // reset reconnect attempts after a successful connection
        console.log("WebSocket connected successfully.");
        keepAlive.current = setInterval(sendKeepAliveMessage(newSocket), 10000);
      };

      const onError = (err) => {
        setSocketState(2); // error
        console.error("WebSocket error:", err);
      };

      const onClose = () => {
        clearInterval(keepAlive.current);
        setSocketState(3); // closed
        console.info("WebSocket closed. Attempting to reconnect...");
        setTimeout(connectToDeepgram, 3000); // reconnect after 3 seconds
        setReconnectAttempts((attempts) => attempts + 1);
      };

      const onMessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received message from Deepgram:", data);
          
          // Handle different message types
          switch (data.type) {
            case "Welcome":
              console.log("Connected to Deepgram with session ID:", data.session_id);
              break;
            case "Error":
              console.error("Deepgram error:", data.error);
              break;
            case "Transcript":
              console.log("Transcript:", data.text);
              break;
            case "Audio":
              console.log("Received audio data");
              break;
            default:
              console.log("Unknown message type:", data.type);
          }
        } catch (error) {
          console.error("Error processing message:", error);
        }
      };

      newSocket.binaryType = "arraybuffer";
      newSocket.addEventListener("open", onOpen);
      newSocket.addEventListener("error", onError);
      newSocket.addEventListener("close", onClose);
      newSocket.addEventListener("message", onMessage);

      setSocket(newSocket);
    } catch (error) {
      console.error("Error in connectToDeepgram:", error);
      setSocketState(2); // error
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log("DeepgramContextProvider unmounting, cleaning up...");
      if (keepAlive.current) {
        clearInterval(keepAlive.current);
      }
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return (
    <DeepgramContext.Provider
      value={{
        socket,
        socketState,
        rateLimited,
        connectToDeepgram,
      }}
    >
      {children}
    </DeepgramContext.Provider>
  );
};

function useDeepgram() {
  return useContext(DeepgramContext);
}

export { DeepgramContextProvider, useDeepgram };
