// UI
import React from 'react';
import ReactDOM from 'react-dom';
import AirPoker from './airpoker.js';
import Model from './model/darai0512.js'; //require('./model/darai0512.js');

let model = new Model();
let setPlayers = [{name: 'You', options: {tip: 25, turn: 1}}, {name: model.name, options: {tip: 25, turn: 2}}];
let airPoker = new AirPoker(setPlayers);

var AirPokerUi = React.createClass({
  getInitialState: function() {
    const airPoker = this.props.airPoker;
    return {
      hand: airPoker.findCandidates('You'),
      air: airPoker.getRemainingAir('You'),
      round: airPoker.round,
      field: null, 
      phase: 'card', // or 'rank' or 'bet' or 'end' (or 'enter')
      win: null
    };
  },
  setField: function(card) {
    const airPoker = this.props.airPoker;
    const model = this.props.model;
    let field = airPoker.setField('You', card);
    field = airPoker.setField(model.name, model.select(airPoker.findCandidates(model.name), airPoker.remainingCardCandidates));
    this.setState({
      field: field,
      hands: airPoker.findCandidates('You'),
      phase: 'bet'
    });
  },
  // required turn
  bet: function(action, air) {
    const airPoker = this.props.airPoker;
    const model = this.props.model;
    let nextBet = false;
    if (airPoker.bet('You', action, air)) {
      let bet = model.bet(action, airPoker.getRemainingAir(model.name), airPoker.getMaxRaise());
      nextBet = airPoker.bet(model.name, bet.action, bet.tip);
    }
    if (nextBet) {
      this.setState({
        air: airPoker.getRemainingAir('You')
      });
    } else {
      this.setState({
        air: airPoker.getRemainingAir('You'),
        phase: 'judge'
      });
    }  
  },
  judge: function(card) {
    const airPoker = this.props.airPoker;
    const model = this.props.model;
    let result = this.props.airPoker.judge([{name: 'You', maxRankFlag: true}]);
    if (result) {
      this.setState({
        field: null,
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
    let keyPrefix = 1;
    let yourCardNodes = this.state.hand.map(function(card) { // @todo Object.assign([], this.state.hand)が必要？
      return (
        <Card card={card} phase={this.state.phase} setField={this.setField} key={keyPrefix++ + '-' + card}/>
      );
    }, this);
    let npcCardNodes = this.state.hand.map(function(card) {
      card = '?';
      return (
        <Card card={card} key={keyPrefix++ + '-' + card}/>
      );
    }, this);
    return (
      <div className="airPoker">
        <div className="hand npc">{npcCardNodes}</div>
        {fieldNodes()}
        <div className="hand you">{yourCardNodes}</div>
      </div>
    );
  }
});
var Card = React.createClass({
  getMaxRankCombination: function() {
  },
  setField: function(e) {
    e.preventDefault();
    this.props.setField(this.props.card);
  },
  render: function() {
    let cardNode = () => {
      if (this.props.phase != 'card' || this.props.card === '?') {
        return (
          <span className="card">{this.props.card} </span>
        );
      } else {
        return (
          <button className="card" type="button" onClick={this.setField} onMouseOver={this.getMaxRankCombination}>{this.props.card}</button>
        );
      }
    };
    return cardNode();
  }
});
var Rank = React.createClass({
  setField: function(e) {
    e.preventDefault();
    this.props.setField(this.props.card);
  },
  render: function() {
    let cardNode = () => {
      if (this.props.phase != 'card' || this.props.card === '?') {
        return (
          <span className="card">{this.props.card} </span>
        );
      } else {
        return (
          <button className="card" type="button" onClick={this.setField} onMouseOver={this.getMaxRankCombination}>{this.props.card}</button>
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
  <AirPokerUi airPoker={airPoker} model={model} />,
  document.getElementById('container')
);
