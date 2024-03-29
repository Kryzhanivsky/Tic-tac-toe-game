import './App.css';
import React from "react";
import Board from "./components/Board";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(undefined),
                playerIndex: 0,
                reviewSquares: false,
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares:squares,
                playerIndex: i,
                reviewSquares: false,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        const history = this.state.history.slice()
        history.map((obj,index) => index === step ? obj.reviewSquares = true : obj.reviewSquares = false
        )

        this.setState({
            history: history,
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                "Go to move №" + move +
                ` (row: 
                    ${step.playerIndex >= 0 && step.playerIndex <= 2 ? "1" : step.playerIndex >= 3 && step.playerIndex <= 5 ? "2" : "3"}
                , col: 
                    ${step.playerIndex === 0 || step.playerIndex === 3 || step.playerIndex === 6 ? "1" : 
                    step.playerIndex === 1 || step.playerIndex === 4 || step.playerIndex === 7 ? "2" : "3"})`:
                "Go to game start";

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)} className="history-button">{desc}</button>
                </li>
            );
        })

        let status;
        if (winner) {
            status = winner;
        } else {
            status = this.state.xIsNext? 'X' : 'O';
        }
        return (
            <div className="app">
                <div className='status'>{winner ? "Winner is: " : "Next player is: "}<span className={(winner ? !this.state.xIsNext : this.state.xIsNext) ? 'status-x' : 'status-o'}>{status}</span></div>
                <Board
                    squres={current.squares}
                    reviewSquares = {current.reviewSquares}
                    playerIndex = {current.playerIndex}
                    onClick={(i) => this.handleClick(i)}
                />
                <div className="app-info">
                    <ul>{moves}</ul>
                </div>
            </div>
        );
    }
}

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0 ; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default App;
