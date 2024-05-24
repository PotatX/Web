import React from "react";
import Card from "./Card";

export type WeatherInfo = {
description: string, // Информация о погоде.
location:	string, //nullable: true Местоположение.
date: string, //($date-time) Дата и время.
temperature: number, //($double) Температура.
windDirection:	string, //nullable: true Направление ветра.
windSpeed: number, //($double) Скорость ветра.
humidity:	number, //($double) Влажность.
}

type DataList = {
  list : WeatherInfo[],
}

const weatherURL = "https://vm.nathoro.ru/weather?lattitude=54.3&longitude=48.4";

class WeekContainer extends React.Component<{}, DataList> {

  componentDidMount = () => {
    fetch(weatherURL)
      .then((res) => res.json())
      .then((data) => {
        const list = data as WeatherInfo[];
        const filteredList = list.filter((value) => value.date.includes("T00:"))
        this.setState({ list: filteredList });
      });
  };

  formatCards = () => {
    return this.state?.list
      ? this.state.list.map((weatherInfo, index) =>
      <Card {...weatherInfo} />)
      : null
  };

  render() {
    return (
      <div className="">
        <h1 className="display-4 jumbotron"> Прогноз погоды на 5 дней </h1>{" "}
        <h5 className="display-4 text-muted"> Ulyanovsk </h5>{" "}
        <div className="row justify-content-center"> {this.formatCards()} </div>{" "}
      </div>
    );
  }
}

export default WeekContainer;
