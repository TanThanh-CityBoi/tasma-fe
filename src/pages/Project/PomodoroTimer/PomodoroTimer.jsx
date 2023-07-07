import React from 'react'
import Iframe from 'react-iframe'

export default function PomodoroTimer() {
  return (
    <Iframe url="http://127.0.0.1:5500/simple_pomodoro/"
        width="100%"
        height="750px"
        // display="block"
        position="relative"
        frameBorder={0}

        />
  )
}
