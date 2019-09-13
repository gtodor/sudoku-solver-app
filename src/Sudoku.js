import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Cell from "./Cell";
import Alert from "./Alert";

class Sudoku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: new Array(81).fill(0),
      rowIndexes: Array.from(Array(9).keys()),
      columnIndexes: Array.from(Array(9).keys()),
      alertMessages: [],
      loading: false,
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

  handleErrors = response => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  };

  solveSudoku = () => {
    const sudoku = this.state.cells.join("");
    this.setState({
      loading: true,
    });

    fetch(
      `https://sudoku-solver-api.herokuapp.com/sudoku_solver/api/solve?sudoku=${sudoku}`,
      {
        method: "get"
      }
    )
      .then(this.handleErrors)
      .then(response => {
        this.setState({
          cells: response.solution,
          loading: false
        });
      })
      .catch(err => {
        err.json().then(errJson => {
          const uuid = require("uuid/v1");
          const key = uuid();
          this.setState({
            alertMessages: [
              ...this.state.alertMessages,
              { message: errJson.error, key }
            ],
            cells: new Array(81).fill(0),
            loading: false
          });
        });
      });
  };

  clearSudoku = () => {
    this.setState({
      cells: new Array(81).fill(0)
    });
  };

  alertClosed = key => {
    this.setState({
      alertMessages: this.state.alertMessages.filter(am => am.key !== key)
    });
  };

  render() {
    return (
      <div className="Sudoku">
        <div className="toastRegion">
          {this.state.alertMessages.map(alertMessage => (
            <Alert
              key={alertMessage.key}
              id={alertMessage.key}
              message={alertMessage.message}
              onClose={this.alertClosed}
            />
          ))}
        </div>
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
        <div className="buttonsPanel">
          <Button
            variant="outline-primary"
            size="lg"
            className="button"
            onClick={this.solveSudoku}
            disabled={this.state.loading}
          >
            {this.state.loading ? (
              <div>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </div>
            ) : (
              "Solve"
            )}
          </Button>
          <Button
            variant="outline-primary"
            size="lg"
            className="button"
            onClick={this.clearSudoku}
            disabled={this.state.loading}
          >
            Clear
          </Button>
        </div>
      </div>
    );
  }
}

export default Sudoku;
