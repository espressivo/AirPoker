import AirPoker from './logic/airpoker.js';

/*
 * main: player regist() -> setTurn() -> play() { rule.action() }
 */
const a = new AirPoker([{name: 'You', turn: 1, tip: 20}, {name: 'NPC', turn: 2, tip: 20}]);
let candidates = a.findCandidates('You');
let field = a.action('You', candidates[0]);
a.bet('You', 1);
console.log(field);
console.log(a.judge([{name: 'You', maxRankFlag: true}]));
// generatePair_() -> sumCard()
/*
var react = require('react');
var AirPokerComp = react.createClass({
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
  <AirPokerComp />,
  document.getElementById('container')
);
*/