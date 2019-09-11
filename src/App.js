import React from "react";
import "./App.css";
import Sudoku from "./Sudoku";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Sudoku />
      <Footer />
    </div>
  );
}

export default App;
