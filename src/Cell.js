import React from "react";

class Cell extends React.Component {
  changedValue = event => {
    let enteredValue = event.target.value;
    enteredValue = enteredValue.toString().replace(/[^0-9]/g, '');

    if (enteredValue === "") {
      enteredValue = 0;
    } else {
      enteredValue = Number.parseInt(enteredValue, 10);
    }

    this.props.onChange(
      isNaN(enteredValue) ? 0 : enteredValue,
      this.props.rowIndex,
      this.props.columnIndex
    );
  };

  render() {
    const value = this.props.value;
    return (
      <input
        type="text"
        pattern="[1-9]"
        maxLength={1}
        value={value !== 0 ? value : ""}
        onChange={this.changedValue}
      />
    );
  }
}

export default Cell;
