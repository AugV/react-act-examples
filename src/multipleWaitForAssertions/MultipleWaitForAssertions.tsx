import React from "react";

export const MultipleWaitForAssertionsFunction = ({
  onClick,
}: {
  onClick: (value: string) => void;
}) => {
  return (
    <button
      onClick={() => {
        setTimeout(() => {
          onClick("test");
        }, 500);
      }}
    >
      Test
    </button>
  );
};

export const MultipleWaitForAssertionsElement = () => {
  const [isButtonVisible, setIsButtonVisible] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);
    }, 500);
  }, []);

  return (
    <div>
      <h1>Title</h1>
      <p>Description</p>
      {isButtonVisible ? <button>Test</button> : <div>Loading button</div>}
    </div>
  );
};
