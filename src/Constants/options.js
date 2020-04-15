export default {
  xAxis: {
    type: "datetime",
  },
  yAxis: {
    title: {
      text: "Cases / Deaths",
    },
  },
  chart: {
    type: "line",
    spacingLeft: 50,
    spacingRight: 50,
    style: {
      color : "grey",
    }
  },
  rangeSelector: {
    selected: 1,
  },
  title: {
    text: "2020",
  },
  series: [
    {
      data: [],
    },
  ],
};
