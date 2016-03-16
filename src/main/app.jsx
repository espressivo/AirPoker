import {Card} from './logic/trump_framework/card.js';
import Player from './logic/trump_framework/player.js';
//import AirPoker from './logic/airpoker.js';

/*
 * main: player regist() -> setTurn() -> play() { rule.action() }
 */
var players = new Array();
players.push(new Player({name: 'You', turn: 1, tip: 20}));
players.push(new Player({name: 'NPC', turn: 2, tip: 20}));
var react = require('react');
var a = new Card(5, 'HEART');
var b = new Card(6, 'HEART');
var res = "wrong";
if (a.suit === b.suit) {
    res = "suit ok";
    if (a.number != b.number) {
        res += "    num diff";
    }
}
// npc/you プレイヤーに25枚配り、そこから強い順にまとめて合計値を出す
// generatePair_() -> sumCard()
var AirPoker = react.createClass({
    getInitialState: function() {
        return {
            check: res
        };
    },
    render: function() {
        return (
            <div>
                <p>{this.state.check}</p>
            </div>
        );
    }
});

react.render(
  <AirPoker />,
  document.getElementById('container')
);
