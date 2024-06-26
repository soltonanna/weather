import React, { useState, useEffect } from 'react';

const DateBlock = ({ timezone }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);

        return () => {
        clearInterval(interval);
        };
    }, []);

    const getLocalTime = (date, offset) => {
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    return new Date(utc + offset * 1000);
    };

    const localTime = getLocalTime(currentTime, timezone);

    let year = localTime.getFullYear();
    let month = localTime.toLocaleString('default', { month: 'long' });
    let day = localTime.getUTCDate();
    let weekday = localTime.toLocaleString('default', { weekday: 'long' });
    let hours = localTime.getHours() < 10 ? "0" + localTime.getHours() : localTime.getHours();
    let minutes = localTime.getMinutes() < 10 ? "0" + localTime.getMinutes() : localTime.getMinutes();
    let seconds = localTime.getSeconds() < 10 ? "0" + localTime.getSeconds() : localTime.getSeconds();

    return (
        <div className='current-date'>
        <div className='time'>{`${hours}:${minutes}:${seconds}`}</div>
        <div className='full-date'>
            {`${weekday}, ${day} ${month} ${year}`}
        </div>
        </div>
    );
};

export default DateBlock;
