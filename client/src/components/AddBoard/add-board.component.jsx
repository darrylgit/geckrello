import React from "react";
import { connect } from "react-redux";
import { addBoard } from "../../actions";

import "./add-board.styles.scss";

class AddBoard extends React.Component {
  state = {
    mode: "prompt",
    boardTitle: "",
    borderColor: "#555",
    spans: 0
  };

  // Inialize element height on grid. Its grid height is based on CSS grid spans, so we fetch that value from the DOM and set the number of spans accordingly
  addListRef = React.createRef();

  toggleMode = () => {
    if (this.state.mode === "prompt") {
      this.setState({ mode: "input" });
    } else {
      this.setState({ mode: "prompt" });
    }
  };

  // Submit handlers
  onFormSubmit = event => {
    event.preventDefault();

    // Validate input
    if (!this.state.boardTitle) {
      alert("Please enter a title.");
      return false;
    }

    // Submit input
    this.props.addBoard(this.state.boardTitle);

    // Clear input
    this.setState({ boardTitle: "", inputValid: false, borderColor: "#555" });

    // Change mode back to "prompt"
    this.toggleMode();
  };

  // Controlled input and validation to ensure unique list titles
  handleChange = e => {
    this.setState({
      boardTitle: e.target.value
    });

    e.target.value
      ? this.setState({ borderColor: "#4fa644" })
      : this.setState({ borderColor: "red" });
  };

  render() {
    if (this.state.mode === "prompt") {
      return (
        <div ref={this.addListRef} className="addList addList__prompt">
          <button onClick={this.toggleMode} className="addList__prompt-button">
            <span className="addList__prompt-plus">+</span>
            <span className="addList__prompt-label"> Add new board</span>
          </button>
        </div>
      );
    } else {
      return (
        <div
          className="addList addList__input"
          ref={this.addListRef}
          style={{ gridRowEnd: `span ${this.state.spans}` }}
        >
          <div className="addList__form">
            <form onSubmit={this.onFormSubmit} className="form">
              <div className="form__group">
                <input
                  type="text"
                  className="form form__input form__input--validation"
                  value={this.state.listTitle}
                  onChange={this.handleChange}
                  style={{ borderBottomColor: this.state.borderColor }}
                  placeholder="New board title..."
                  autoFocus
                />
              </div>
              <div className="form__group">
                <input
                  type="submit"
                  className="form__submit"
                  value="Add Board"
                />
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { boards: state.boards };
};

export default connect(mapStateToProps, { addBoard })(AddBoard);
