import React from "react";

import Square from "./square";

class Board extends React.Component {
  renderSquare(i, cell) {
    return (
      <Square
        value={this.props.squares[i]}
        winner_line={this.props.winner_line.includes(i)}
        //Отобразите позицию для каждого хода в формате (колонка, строка) в списке истории ходов.
        onClick={() => this.props.onClick(i, cell)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          <div className="square-desc"></div>
          <div className="square-desc">A</div>
          <div className="square-desc">B</div>
          <div className="square-desc">C</div>
        </div>
        <div className="board-row">
          <div className="square-desc">1</div>
          {this.renderSquare(0, { column: "A", row: 1 })}
          {this.renderSquare(1, { column: "B", row: 1 })}
          {this.renderSquare(2, { column: "C", row: 1 })}
        </div>
        <div className="board-row">
          <div className="square-desc">2</div>
          {this.renderSquare(3, { column: "A", row: 2 })}
          {this.renderSquare(4, { column: "B", row: 2 })}
          {this.renderSquare(5, { column: "C", row: 2 })}
        </div>
        <div className="board-row">
          <div className="square-desc">3</div>
          {this.renderSquare(6, { column: "A", row: 3 })}
          {this.renderSquare(7, { column: "B", row: 3 })}
          {this.renderSquare(8, { column: "C", row: 3 })}
        </div>
      </div>
    );
  }
}

export default Board;
