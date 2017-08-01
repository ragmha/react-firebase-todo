var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
  // Renders a list of our Todo
  render: function() {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  },
  renderList: function() {
    if (!this.props.items) {
      return <h4>Add a Todo to get Started =]</h4>;
    } else {
      var children = [];

      for (var key in this.props.items) {
        var item = this.props.items[key]; // grab item
        item.key = key; // assign key to items

        children.push(<ListItem item={item} key={key} />);
      }

      return children;
    }
  },
});
