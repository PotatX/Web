import React from "react";
import "./Card.css";

type CardListProps = {
  date: string,
  description: string,
  index: number
}

class Card extends React.Component<CardListProps> {
  render() {
    const date = new Date(this.props.date)
    console.log(date)
    const strD = new Intl.DateTimeFormat('en-US',
      {
        year: 'numeric', month: '2-digit', day: '2-digit',
      }).format(date);

    return (
      <div className="card">
        <div className="card_description">
          {this.props.description}
        </div>
          {strD}
      </div>
    );
  }
}

export default Card;
