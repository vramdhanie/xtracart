import React from "react";
import { VERSION, BUILD } from "./config";

function App() {
  return (
    <div className="text-6xl text-center text-blue-300">
      {VERSION} {BUILD}
    </div>
  );
}

export default App;
