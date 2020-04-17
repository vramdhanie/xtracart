import React from "react";
import { VERSION, BUILD, GOOGLE_ANALYTICS_KEY } from "./config";

function App() {
  return (
    <div className="text-6xl text-center text-blue-300">
      <h1>Preview (On Staging)</h1>
      <h3>Version: {VERSION}</h3>
      <h4>Build: {BUILD}</h4>
      <h5>Analytcs: {GOOGLE_ANALYTICS_KEY}</h5>
    </div>
  );
}

export default App;
