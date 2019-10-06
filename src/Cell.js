import React from "react";

class Cell extends React.Component {
  handleKeyPress = event => {
    if (event.charCode >= 48 && event.charCode <= 57 && !this.props.isSolved) {
      const number = event.charCode - 48;
      this.props.onChange(number, this.props.rowIndex, this.props.columnIndex);
    }
  };

  render() {
    const value = this.props.value;
    return (
      <div
        tabIndex={this.props.rowIndex * 9 + this.props.columnIndex + 1}
        onKeyPress={this.handleKeyPress}
        className={this.props.isHint ? "SudokuCell isHint" : "SudokuCell"}
      >
        {value !== 0 ? value : ""}
      </div>
    );
  }
}

export default Cell;
