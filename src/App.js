import React from "react";
import { VERSION, BUILD, GOOGLE_ANALYTICS_KEY, BRANCH_NAME } from "./config";

function App() {
  return (
    <div className="text-6xl text-center text-blue-300">
      <h1>Preview (On Staging)</h1>
      <h3>Version: {VERSION}</h3>
      <h4>Build: {BUILD}</h4>
      <h5>Analytcs: {GOOGLE_ANALYTICS_KEY}</h5>
      <h6>Branch: {BRANCH_NAME}</h6>
    </div>
  );
}

export default App;
