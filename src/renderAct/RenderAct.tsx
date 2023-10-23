import React from 'react';

const RenderAct = () => {
  const img = React.useRef<HTMLImageElement | null>()
  const [content, setContent] = React.useState('loading');
  console.log("content",content)

  React.useEffect(()=>{
    setTimeout(()=>{
      console.log("ref",img.current)
      // @ts-ignore
      img.current.onLoad()
    },100)
  },[img])

  return (
    <div>
      {content}
      <img
      alt=""
      ref={img}
      src='https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTVNBVgDTZrFvUARECMzBrur7L34aGgMgeqrY3JE6rWUauX3cRgAjXim93D7cn2UTQM' 
      onLoad={()=> {
          console.log("img loaded")
          setContent('img loaded');
      }}/>
    </div>
  );
};

export default RenderAct;
