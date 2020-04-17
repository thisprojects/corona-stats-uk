import _ from "lodash";

// The array object returned from the API contains elements formatted like this -> {date: *unixTimeCode* , value: *value*}. This function takes 
// the data and transforms it into an object that contains two keys, one being the collections name and the other being the data formatted as an array 
// [*date*, *value*]

const convertObjectToArray = (object) => {
  let y = [];
  for (let x in object) {
    y.push(object[x]);
  }
  return [y];
}


export default (rawData) => {
  let formattedData = [];
  for (let x in rawData) {
    const y = rawData[x].reduce((acc, curr) => {
      acc = acc.concat(convertObjectToArray(curr));
      return acc;
    }, []);
    const resultsSortedByDate = y.sort((a ,b) => (a[0] - b[0]))
    const latestResult = resultsSortedByDate[resultsSortedByDate.length -1][1]
    formattedData.push({
      name: x,
      data: _.cloneDeep(resultsSortedByDate),
      latestResult
    });
  }
  return formattedData;
};
