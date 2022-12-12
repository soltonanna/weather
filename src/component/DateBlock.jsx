import React, { useState, useEffect } from 'react';

const DateBlock = () => {
    
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    let year = currentTime.getFullYear();
    let month = currentTime.toLocaleString('default', { month: 'long' });
    let day = currentTime.getUTCDate();
    let weekday = currentTime.toLocaleString('default', { weekday: 'long' });
    let hours = currentTime.getHours() < 10 ? "0" + currentTime.getHours() : currentTime.getHours();
    let minutes = currentTime.getMinutes() < 10 ? "0" + currentTime.getMinutes() : currentTime.getMinutes();
    let seconds = currentTime.getSeconds() < 10 ? "0" + currentTime.getSeconds() : currentTime.getSeconds();

    return (
        <div className='current-date'>
            <div className='time'>{`${hours}:${minutes}:${seconds}`}</div>
            <div className='full-date'>
                {`${weekday}, ${day} ${month} ${year}`}
            </div>
        </div>
    );
}

export default DateBlock;