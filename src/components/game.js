import React from "react";

import Board from "./board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          cell: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isDesc: false,
    };
  }
  //handleClick выполняется когда вы кликаете на клетки
  handleClick(i, cell) {
    //Это гарантирует, что если мы «вернёмся назад», а затем сделаем новый шаг из этой точки, мы удалим всю «будущую» историю, которая перестала быть актуальной.
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const xIsNext = this.state.xIsNext;

    if (this.calculateWinner(squares).winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          cell: cell,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !xIsNext,
    });
  }

  handleSort() {
    this.setState({
      isDesc: !this.state.isDesc,
    });
  }

  //указывает номер хода
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], winner_line: lines[i] };
      }
    }
    return { winner: null, winner_line: [] };
  }

  //Отображение статуса игр
  render() {
    const history = this.state.history;
    //рендерил ход, соответствующий stepNumber
    const current = history[this.state.stepNumber];
    const calc_winner = this.calculateWinner(current.squares);
    const winner = calc_winner.winner;
    const winner_line = calc_winner.winner_line;
    //переменная step содержит текущее значение элемента history
    const moves = history.map((step, move) => {
      //move — текущий индекс элемента history
      const desc = move
        ? "Перейти к ходу(" + step.cell.column + step.cell.row + ") #" + move
        : "К началу игры";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {move == this.state.stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      if (this.state.stepNumber == 9) {
        status = "Ничья!!!!";
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              winner_line={winner_line}
              onClick={(i, cell) => this.handleClick(i, cell)}
            />
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            <ol>{this.state.isDesc ? moves.reverse() : moves}</ol>
            <button onClick={() => this.handleSort()}>
              Сортировать: {this.state.isDesc ? "Убыванию" : "Возрастанию"}
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Game;
