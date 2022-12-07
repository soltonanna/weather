import React from 'react';
import cl from './Video.module.scss';
import { Rain } from '../../../utils/videos';

const Video = (props) => {
  return (
    <video {...props} className={cl.video}>
        <source src={Rain} type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
    </video>
  )
}

export default Video;