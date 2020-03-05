import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

import VideoPlayer from "./components/VideoPlayer";

library.add(fas);

function App() {
  return (
    <div className="App">
      <VideoPlayer />
    </div>
  );
}

export default App;
