import React from "react";
import Totals from "./Totals";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default ({ loading, noData, options, cachedResults }) => (
  <div className="line-chart">
    {!loading && noData && <h1 className="nodata">Please Adjust Filters</h1>}
    {!loading && (
      <div className="totals-wrapper">
        <h3>Latest Totals</h3>
        <div className="totals">
          <Totals series={cachedResults} />
        </div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    )}
    {loading && <h1 className="loading">Loading....</h1>}
  </div>
);
