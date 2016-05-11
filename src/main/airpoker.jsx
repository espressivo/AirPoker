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
      air: 25, // this.props.airPoker.getRemainingAir('You')
      round: this.props.airPoker.round,
      field: null, 
      phase: 'select', // or 'bet' or 'end' (or 'enter')
      win: null
    };
  },
  setField: function(card) {
    let field = this.props.airPoker.setField('You', card);
    this.setState({
      field: field,
      hands: this.props.airPoker.findCandidates('You'),
      phase: 'bet'
    });
  },
  judge: function(card) {
    let result = this.props.airPoker.judge([{name: 'You', maxRankFlag: true}]);
    if (result) {
      this.setState({
        win: result,
        phase: 'end'
      }); // true or false
    } else {
      this.setState({field: null});
    }
  },
  render: function() {
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
        <Hand hand={hand} player='npc' phase={this.state.phase} setField={this.setField} />
        {fieldNodes()}
        <Hand hand={hand} player='you' phase={this.state.phase} setField={this.setField} />
      </div>
    );
  }
});
var Hand = React.createClass({
  render: function() {
    let keyPrefix = 1;
    let cardNodes = this.props.hand.map(function(card) {
      if (this.props.player === 'npc') {
        card = '?';
      }
      return (
        <Card card={card} phase={this.props.phase} setField={this.props.setField} key={keyPrefix++ + '-' + card}/>
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
    let cardNode = () => {
      if (this.props.phase != 'select' || this.props.card === '?') {
        return (
          <span className="card">{this.props.card} </span>
        );
      } else {
        return (
          <button className="card" type="button" onClick={this.setField} onMouseOver={this.maxRankCombination}>{this.props.card}</button>
        );
      }
    };
    return cardNode();
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
