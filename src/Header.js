import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="titleBar">
        <h1> Sudoku Solver </h1>
        <h3> Fill in the Sudoku and hit Solve </h3>
      </div>
      <div className="githubBanner">
        <a href="https://github.com/gtodor/sudoku-solver-app">
          <img width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_orange_ff7600.png?resize=149%2C149" className="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1"/>
        </a>
      </div>
    </div>
  );
}

export default Header;
