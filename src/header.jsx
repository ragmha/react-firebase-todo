var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: '',
    };
  },

  render: function() {
    return (
      <div className="input-group">
        <input
          value={this.state.text}
          onChange={this.handleInputChange}
          type="text"
          className="form-control"
        />
        <span className="input-group-btn">
          <button
            onClick={this.handleClick}
            className="btn btn-default"
            type="button"
          >
            Add
          </button>
        </span>
      </div>
    );
  },

  handleClick: function() {
    // Send value text input to Firebase
    this.props.itemsStore.push({
      // makes a reference to our firebase obj , 'push' saves/add(creates a new obj in our firebase)
      text: this.state.text,
      done: false,
    });

    this.setState({ text: '' }); // clear out our input after 'Add'
  },

  handleInputChange: function(event) {
    // 'event' is an obj that describes(direct reference to DOM element) the action
    // that was taken / changed / updated

    // 'target' is DOM node reference, 'value' prop is the text in that input element
    this.setState({ text: event.target.value });
    // this updates our state and the input 'value', and triggers re-renders our component
  },
});
