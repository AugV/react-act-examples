import React from "react";

const TimersLoop = () => {
  const [content, setContent] = React.useState(1);

  React.useEffect(() => {
    const interval = setTimeout(() => {
      console.log("timeout 1");
      setContent(2);

      setTimeout(() => {
        console.log("timeout 2");
        setContent(3);
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>TimersLoop</p>
      <p>{content}</p>
    </div>
  );
};

export default TimersLoop;
