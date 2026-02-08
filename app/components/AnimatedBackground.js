"use client";

import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { withBasePath } from "../utils/deepgramUtils";

const AnimatedBackground = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient && (
        <Player
          autoplay
          loop
          src={withBasePath("/sts-bg.json")}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
          className="animatedBackground"
        />
      )}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "black",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
