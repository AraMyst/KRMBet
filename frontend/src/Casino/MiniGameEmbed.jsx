import React from 'react';

const MiniGameEmbed = ({ src, title }) => (
  <div className="w-[200px] h-[200px] rounded overflow-hidden shadow-lg">
    <iframe
      src={src}
      title={title}
      width="100%"
      height="100%"
      allowFullScreen
      className="w-full h-full border-0"
    />
  </div>
);

export default MiniGameEmbed;
