import {Card} from './logic/trump_framework/Card.js';

var React = require('react');
var a = new Card(5, 'HEART');
var b = new Card(6, 'HEART');
var res = "wrong";
if (a.suit === b.suit) {
    res = "suit ok";
    if (a.number != b.number) {
        res += "    num diff";
    }
}

var AirPoker = React.createClass({
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

React.render(
  <AirPoker />,
  document.getElementById('container')
);
