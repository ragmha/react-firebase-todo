var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire'); //communication layer between React and Firebase
var Firebase = require('firebase'); // syncing our data with firebase.com
var rootUrl = 'https://rtodos.firebaseio.com/';

var Header = require('./header');
var List = require('./list');

var App = React.createClass({
  mixins: [ReactFire],

  getInitialState: function() {
    return {
      items: {},
      loaded: false,
    };
  },

  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
    // 'this.handleDataLoaded' is called when 'value' is triggered
  },
  render: function() {
    return (
      <div className="row panel panel-default">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="text-center">To-Do</h2>
          <Header itemsStore={this.firebaseRefs.items} />
          <hr />
          <div className={'content ' + (this.state.loaded ? 'loaded' : '')}>
            <List items={this.state.items} />
            {this.deleteButton()}
          </div>
        </div>
      </div>
    );
  },
  // itemStore is direct ref to Firebase obj
  // items - reads our item obj
  handleDataLoaded: function() {
    this.setState({ loaded: true });
  },

  deleteButton: function() {
    if (!this.state.items) {
      return;
    } else {
      return (
        <div className="text-center clear-complete">
          <hr />
          <button
            type="button"
            onClick={this.onDeleteClick}
            className="btn btn-default"
          >
            Clear
          </button>
        </div>
      );
    }
  },

  onDeleteClick: function() {
    for (var key in this.state.items) {
      if (this.state.items[key].done === true) {
        this.fb.child(key).remove();
      }
    }
  },
});

var element = React.createElement(App, {});

ReactDOM.render(element, document.querySelector('.container'));
