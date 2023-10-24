import React from "react";

const NoAwait = () => {
  const [isContentVisible, setIsContentVisible] = React.useState(false);

  return (
    <div>
      <p>NoAwait</p>
      <button
        onClick={() => {
          setTimeout(() => {
            // intentionally incorrect
            setIsContentVisible(true);
          }, 500);
        }}
      >
        Toggle content
      </button>
      {isContentVisible ? <div>Content</div> : null}
    </div>
  );
};

export default NoAwait;
