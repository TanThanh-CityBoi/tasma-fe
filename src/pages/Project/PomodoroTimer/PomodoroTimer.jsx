import React, { useState } from "react";
import Iframe from "react-iframe";

export default function PomodoroTimer() {
  const [error, setError] = useState(false);

  const handleIframeError = () => {
    setError(true);
  };

  //how to run pomodoro timer:
  //Down load pomodoro timer here:   https://github.com/PhuocDev/simple_pomodoro.git
  //run it by Go live in vscode
  return (
    <div>
      {error ? (
        <div>Server error</div>
      ) : (
        <Iframe
          src="https://incredible-cendol-e83782.netlify.app/"
          width="100%"
          height="1000px"
          frameBorder={0}
          onError={handleIframeError}
          scrolling="no"
        />
      )}
    </div>
  );
}
