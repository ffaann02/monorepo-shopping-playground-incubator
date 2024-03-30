import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ gameTracker }) => {
    const calculateTimeLeft = () => {
        const endTime = gameTracker.end_time;
        const difference = endTime - Date.now();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const minutes = timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes;
    const seconds = timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds;

    return (
        <span className="countdown font-mono text-4xl text-green-600 mx-auto">
            <span id="minute_countdown" style={{ "--value": minutes }}>{minutes}</span>:
            <span id="second_countdown" style={{ "--value": seconds }}>{seconds}</span>
        </span>
    );
};

export default CountdownTimer;
