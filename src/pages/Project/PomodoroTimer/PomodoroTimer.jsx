import React, { useState } from 'react'
import Iframe from 'react-iframe'

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
            src="http://127.0.0.1:5500/simple_pomodoro/"
            width="100%"
            height="750px"
            frameBorder={0}
            onError={handleIframeError}
          />
        )}
      </div>
    );
}
