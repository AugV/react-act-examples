import "./App.css";
import React from 'react';

const TimersLoop = () => {
  const [content, setContent] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setContent(2);
    }, 1008);

    
  }, []);

  React.useEffect(() => {
    content && setTimeout(() => {
      setContent(8);
      console.log("here")
    }, 1008);
  }, [content]);

  return (
    <div>
      <p>TimersLoop</p>
      <p>{content}</p>
    </div>
  );
};
function App() {
  return (
    <div className="App">
      <TimersLoop />
      
    </div>
  );
}

export default App;
