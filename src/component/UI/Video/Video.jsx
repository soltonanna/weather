import React from 'react';
import cl from './Video.module.scss';

const Video = (props) => {
  return (
    <video {...props} className={cl.video}>
        <source src={props.src} type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
    </video>
  )
}

export default Video;