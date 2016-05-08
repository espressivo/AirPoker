// UI
import React from 'react';
import ReactDOM from 'react-dom';
import AirPoker from './airpoker.js';

let airPoker;
var AirPokerUi = React.createClass({
  getInitialState: function() {
    airPoker = new AirPoker('You', 'darai0512');
    return {hands: airPoker.findCandidates('You'), tip: 20, field: null};
  },
  setField: function(hand) {
    //let remainings = this.pool_.splice(this.pool_.indexOf(card), 1);
    this.setState({field: hand, hands: this.state.hands});
  },
  render: function() {
    let hands = Object.assign([], this.state.hands);
    return (
      <div className="airPoker">
        <h1>AirPoker</h1>
        <Field field={this.state.field} />
        <Hands hands={hands} setField={this.setField} />
      </div>
    );
  }
});
var Hands = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    let hand = ReactDOM.findDOMNode(this.refs.hand).value.trim();
    console.log(hand);
    console.log('test');
    if (!hand) {
      return;
    }
    this.props.setField(hand);
    return;
  },
  render: function() {
    let handNodes = this.props.hands.map(function (hand) {
      return (
        <input type="submit" value={hand} key={hand} ref="hand"/>
      );
    });
    return (
      <div className="handList">
        <form className="handForm" onSubmit={this.handleSubmit}>
          {handNodes}
        </form>
      </div>
    );
  }
});
var Field = React.createClass({
  render: function() {
    airPoker.action('You', this.props.field);
    airPoker.bet('You', 1);
    let field = airPoker.judge([{name: 'You', maxRankFlag: true}]);
    // generatePair_() -> sumCard()
    return (
      <div className="Field">
        {field.rank.name}
      </div>
    );
  }
});
ReactDOM.render(
  <AirPokerUi />,
  document.getElementById('container')
);
