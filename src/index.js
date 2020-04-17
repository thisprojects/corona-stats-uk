import React from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from "lodash";
import "./index.scss";
import getCoronaData from "./Constants/apolloClient";
import optionsTemplate from "./Constants/options";
import convertData from "./Constants/convertData";
import Totals from "./Totals";

const App = () => {
  const [series, updateSeries] = React.useState([]);
  const [loading, updateLoading] = React.useState(true);
  let cachedResults = React.useRef([]);

  // setup chart options - the series object holds the data from api
  let options = _.cloneDeep(optionsTemplate);
  options.series = series;

  const getData = async () => {
    let apiResponse = convertData(await getCoronaData());
    updateSeries(_.cloneDeep(apiResponse));
    cachedResults.current = _.cloneDeep(apiResponse);
    updateLoading(false);
  };

  const applyFilters = (event) => {
    let name = event.target.value;
    let seriesFiltered;

    if (event.target.checked === false) {
      // if checkbox is unchecked filter out the data
      seriesFiltered = _.cloneDeep(series.filter((item) => item.name !== name));
    } else {
      // otherwise find the data from cache and re insert it
      let x = _.cloneDeep(
        cachedResults.current.find((item) => item.name === name)
      );
      seriesFiltered = series.concat(x);
    }
    updateSeries(seriesFiltered);
  };

  // for use if the user filters out all data
  const noData = series.length === 0;

  React.useEffect(() => {
    getData();
  }, []);

  console.log(cachedResults.current);

  return (
    <div className="container">
      <header>
        <h2>Uk Corona Statistics</h2>
      </header>
      <div className="chart">
        {!loading && noData && (
          <h1 className="nodata">Please Adjust Filters</h1>
        )}
        {!loading && (
          <div className="totals-wrapper">
            <h3>Latest Totals</h3>
            <div className="totals">
              <Totals series={cachedResults.current} />
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        )}
        {loading && <h1 className="loading">Loading....</h1>}
      </div>
      <div className="filter">
        <h4>Filters</h4>
        <form>
          <span className="filter-group">
            <label>
              Cumulative Cases
              <input
                defaultChecked={true}
                type="checkbox"
                value="cumulativeUkCases"
                onChange={applyFilters}
              />
            </label>
            <label>
              Daily Deaths
              <input
                defaultChecked={true}
                type="checkbox"
                value="dailyUkDeaths"
                onChange={applyFilters}
              />
            </label>
          </span>
          <span className="filter-group">
            <label>
              Cumulative Deaths
              <input
                defaultChecked={true}
                type="checkbox"
                value="cumulativeUkDeaths"
                onChange={applyFilters}
              />
            </label>
            <label>
              Daily Cases
              <input
                defaultChecked={true}
                type="checkbox"
                value="dailyUkCases"
                onChange={applyFilters}
              />
            </label>
          </span>
        </form>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
