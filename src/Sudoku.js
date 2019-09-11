import React from "react";
import Cell from "./Cell";

class Sudoku extends React.Component {
  constructor(props) {
    super(props);
    console.log("inside constructor");
    this.state = {
      cells: new Array(81).fill(0),
      rowIndexes: Array.from(Array(9).keys()),
      columnIndexes: Array.from(Array(9).keys())
    };
  }

  changeValue = (value, rowIndex, columnIndex) => {
    let index = rowIndex * 9 + columnIndex;
    this.setState({
      cells: [
        ...this.state.cells.slice(0, index),
        value,
        ...this.state.cells.slice(index + 1)
      ]
    });
  };

  render() {
    return (
      <div className="Sudoku">
        <table>
          <tbody>
            {this.state.rowIndexes.map(rowIndex => (
              <tr key={"row_" + rowIndex}>
                {this.state.columnIndexes.map(columnIndex => (
                  <td key={"cell_" + rowIndex + "_" + columnIndex}>
                    <Cell
                      value={this.state.cells[rowIndex * 9 + columnIndex]}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      onChange={this.changeValue}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Sudoku;
