import React, { Component } from "react";

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };

    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  // need to do this to update state since it's passed in via a prop
  componentWillReceiveProps(newProps) {
    if (this.state.isChecked != newProps.checked) {
      const newState = { isChecked: newProps.checked };
      this.setState(newState);
    }
  }

  toggleCheckboxChange() {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));

    handleCheckboxChange(label);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />

          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
