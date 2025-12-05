import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ 
  url, 
  playing = false, 
  controls = true, 
  loop = false, 
  volume = 0.5, 
  style = {}
}) => {
  return (
    <div className="w-full overflow-hidden aspect-video">
      <ReactPlayer
        url={url}
        playing={playing}
        controls={controls}
        loop={loop}
        volume={volume}
        width="100%"
        height="100%"
        style={style} // Passando a prop style para o ReactPlayer
      />
    </div>
  );
};

export default VideoPlayer;
