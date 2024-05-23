import React from "react";
import Card from "./Card";

type DateList = {
  list : FetchData[]
}

type FetchData = {
  dt_txt: string,
  weather: Weather[]
}

type Weather = {
  description: string
}

const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=Ulyanovsk&lang=ru&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27";

//const weatherURL = "http://www.7timer.info/bin/api.pl?lon=48.4&lat=54.3&product=astro&output=json";

class WeekContainer extends React.Component<{}, DateList> {

  componentDidMount = () => {
    fetch(weatherURL)
      .then((res) => res.json())
      .then((data) => {
        const list = data as DateList;
        this.setState({ list: list.list });
      });
  };

  formatCards = () => {
    return this.state?.list
      ? this.state.list.map((fetchData, index) =>
      <Card date={fetchData.dt_txt} description={fetchData.weather[0].description} index={index} />)
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
