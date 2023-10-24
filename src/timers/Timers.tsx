import React from "react";

const Timers = ({ delay = 3000 }: { delay?: number }) => {
  const [content, setContent] = React.useState(1);

  React.useEffect(() => {
    const interval = setInterval(() => setContent(content + 1), delay);

    return () => clearInterval(interval);
  }, [content, delay]);

  return (
    <div>
      <p>Timers</p>
      <p>{content}</p>
    </div>
  );
};

export default Timers;
