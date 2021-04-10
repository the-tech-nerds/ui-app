import React from 'react'
import { useState, useEffect } from 'react';
export default function OtpTimer({timeInSecond, resend}) {
    const initialMinute =  Math.floor(timeInSecond/60)
    const initialSeconds = timeInSecond % 60;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    });

    return (
        <div>
            <span >Time left:  {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</span>
            <button type="button"  disabled={seconds || minutes} onClick={resend} className="btn btn-sm ml-3  btn-outline-primary verify-btn">Resend</button>
        </div>
    )
}

