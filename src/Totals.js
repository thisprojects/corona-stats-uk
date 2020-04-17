import React from "react";

const categories = [
  { label: "cumulativeUkCases", displayName: "Total Uk Cases" },
  { label: "dailyUkDeaths", displayName: "Latest Uk Daily Deaths" },
  { label: "cumulativeUkDeaths", displayName: "Total Uk Deaths" },
  { label: "dailyUkCases", displayName: "Latest Uk Daily Cases" },
];

export default ({ series }) =>
  categories.map((category, index) => ( 
    <div key={ index } className="total-category">
      <p>{ category.displayName }</p>
      { series.find((item) => item.name === `${ category.label }`).latestResult }
    </div>
  ));
