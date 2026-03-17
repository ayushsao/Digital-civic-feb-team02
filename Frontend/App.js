import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PollDetail from "./PollDetail";

function App() {

  localStorage.setItem("role", "citizen"); // for testing

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<PollDetail />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
