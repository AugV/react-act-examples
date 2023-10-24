import "./App.css";
import Timers from "./timers/Timers";
import TimersLoop from "./timersLoop/TimersLoop";
import RenderAct from "./renderAct/RenderAct";
import NoAwait from "./noAwait/NoAwait";

function App() {
  return (
    <div className="App">
      <Timers />
      <TimersLoop />
      <RenderAct />
      <NoAwait />
    </div>
  );
}

export default App;
