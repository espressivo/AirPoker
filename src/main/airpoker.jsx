// UI
import React from 'react';
import ReactDOM from 'react-dom';
import AirPoker from './airpoker.js';
//require('./model/darai0512.js');
import Model from './model/darai0512.js';

var model = new Model();
var airPoker = new AirPoker('You', model);

var AirPokerUi = React.createClass({
  getInitialState: function() {
    return {
      hand: this.props.airPoker.findCandidates('You'),
      tip: 20,
      field: null,
      win: null
    };
  },
  setField: function(card) {
    let field = this.props.airPoker.setField('You', card);
    this.setState({field: field, hands: this.props.airPoker.findCandidates('You')});
  },
  judge: function(card) {
    let result = this.props.airPoker.judge([{name: 'You', maxRankFlag: true}]);
    if (result) {
      this.setState({win: result});
    } else {
      this.setState({field: null});
    }
  },
  render: function() {
    let maxRankCombinations = {};
    let fieldNodes = () => {
      if(this.state.field != null) {
        return (
          <Field field={this.state.field} airPoker={this.props.airPoker} />
        );
      } else {
        return (
          <p>Select your card!</p>
        );
      }
    };
    let hand = Object.assign([], this.state.hand);
    // @todo NpcHandとHandを統一: cssを実装後
    return (
      <div className="airPoker">
        <h1>AirPoker</h1>
        <NpcHand hand={hand} />
        {fieldNodes()}
        <Hand hand={hand} setField={this.setField} maxRankCombinations={maxRankCombinations} />
      </div>
    );
  }
});
var Hand = React.createClass({
  getInitialState: function() {
    return {
      hand: this.props.hand
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      hand : nextProps.hand
    });
  },
  render: function() {
    let cardNodes = this.state.hand.map(function(card) {
      return (
        // maxRankCombination={maxRankCombinations[card]} 
        <Card card={card} setField={this.props.setField} key={card}/>
      );
    }, this);
    return (
      <div className="hand">
        {cardNodes}
      </div>
    );
  }
});
var Card = React.createClass({
  maxRankCombination: function() {
  },
  setField: function(e) {
    e.preventDefault();
    this.props.setField(this.props.card);
  },
  render: function() {
    return (
      <button className="card" type="button" onClick={this.setField} onMouseOver={this.maxRankCombination}>{this.props.card}</button>
    );
  }
});
var NpcHand = React.createClass({
  render: function() {
    let i = 0;
    let cardNodes = this.props.hand.map(function() {
      return (
        <span className="card" type="button" key={++i}>?</span>
      );
    }, this);
    return (
      <div className="hand">
        {cardNodes}
      </div>
    );
  }
});
var Field = React.createClass({
  getInitialState: function() {
    return {
      field: this.props.field
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      field : nextProps.field
    });
  },
  render: function() {
    //<div style={{width: 25px;border: 1px solid #000}}>{this.state.field[1].card}</div>
    return (
        <div className="Field">
          <div>{this.state.field[1].card}</div>
          <div>{this.state.field[0].card}</div>
        </div>
    );
  }
});
var Bet = React.createClass({
  render: function() {
    //this.props.airPoker.bet('You', 1);
    return (
      <div className="betModal">
      </div>
    );
  }
});
ReactDOM.render(
  <AirPokerUi airPoker={airPoker} />,
  document.getElementById('container')
);
