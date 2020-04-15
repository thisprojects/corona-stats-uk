import _ from "lodash";

export default (rawData) => {
  let formattedData = [];
  for (let x in rawData) {
    let y = rawData[x].reduce((acc, curr) => {
      let y = [];
      for (let x in curr) {
        y.push(curr[x]);
      }
      acc = acc.concat([y]);
      return acc;
    }, []);
    formattedData.push({
      name: x,
      data: _.cloneDeep(y),
    });
  }
  return formattedData;
};
