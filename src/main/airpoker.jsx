// UI
import React from 'react';
import ReactDOM from 'react-dom';
import AirPoker from './airpoker.js';
import Model from './model/darai0512.js'; //require('./model/darai0512.js');

let model = new Model();
let players = ['You', model.name];
let airPoker = new AirPoker(players);

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
  componentDidMount() {

  },
  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextState.phase === 'bet') {

    }
  },
  setCard: function(card) {
    const airPoker = this.props.airPoker;
    const model = this.props.model;
    let field = airPoker.setField('You', card);
    field = airPoker.setCard(model.name, model.setCard(airPoker.findCandidates(model.name), airPoker.remainingCardCandidates));
    this.setState({
      field: field,
      hands: airPoker.findCandidates('You'),
      phase: 'rank'
    });
  },
  rankFlag: function(rankFlag) {
    const airPoker = this.props.airPoker;
    const model = this.props.model;
    //airPoker.rankFlag(rankFlag);
    this.setState({
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
      let result = this.props.airPoker.judge([{name: 'You', maxRankFlag: true}]);
      let nextState = {
        field: null,
        air: airPoker.getRemainingAir('You'),
      };
      if (result) {
        nextState.win = result;
        nextState.phase = 'end';
      }
      this.setState(nextState);
    }  
  },
  render: function() {
    let fieldNode = () => {
      if(this.state.field != null) {
        return (
          <Field field={this.state.field} airPoker={this.props.airPoker} />
        );
      }
    };
    let keyPrefix = 1;
    // @todo cardはchildrenに
    let yourCardNode = this.state.hand.map(function(card) { // @todo Object.assign([], this.state.hand)が必要？
      return (
        <Card card={card} phase={this.state.phase} setCard={this.setCard} key={keyPrefix++ + '-' + card}/>
      );
    }, this);
    let npcCardNode = this.state.hand.map(function(card) {
      card = '?';
      return (
        <Card card={card} key={keyPrefix++ + '-' + card}/>
      );
    }, this);
    let guideNode = () => {
      if(this.state.phase === 'card') {
        return (
          <p>Select your card!</p>
        );
      } else if (this.state.phase === 'rank') {
        return (
          <div className="rank">set
            <Rank rankFlag={this.rankFlag}>Max</Rank>
            <Rank rankFlag={this.rankFlag}>Missing</Rank>
          Rank</div>
        );
      } else if (this.state.phase === 'bet') {
        // 許されたactionのみ
        return (
          <div className="bet">set
          <Bet bet={this.bet}>call</Bet>
          <Bet bet={this.bet}>raise</Bet>
          <Bet bet={this.bet}>check</Bet>
          <Bet bet={this.bet}>fold</Bet>
          </div>
        );
      }
    };
    return (
      <div className="airPoker">
        <div className="hand npc">{npcCardNode}</div>
        <div className="fields">{fieldNode()}</div>
        <div className="hand you">{yourCardNode}</div>
        {guideNode()}
      </div>
    );
  }
});
var Card = React.createClass({
  getMaxRankCombination: function() {
  },
  setCard: function(e) {
    e.preventDefault();
    this.props.setCard(this.props.card);
  },
  render: function() {
    let cardNode = () => {
      if (this.props.phase != 'card' || this.props.card === '?') {
        return (
          <span className="card">{this.props.card} </span>
        );
      } else {
        return (
          <button className="card" type="button" onClick={this.setCard} onMouseOver={this.getMaxRankCombination}>{this.props.card}</button>
        );
      }
    };
    return cardNode();
  }
});
var Rank = React.createClass({
  rankFlag: function(e) {
    e.preventDefault();
    this.props.rankFlag(this.props.children);
  },
  render: function() {
    return (
      <button className="rank" type="button" onClick={this.rankFlag}>{this.props.children}</button>
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
      <div className="field">
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
