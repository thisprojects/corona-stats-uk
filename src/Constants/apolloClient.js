
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
  uri: "https://postgres-instance1.herokuapp.com/",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default () =>
  client
    .query({
      query: gql`
        {
          cumulativeUkCases {
            date
            cumulative_cases
          }
          dailyUkDeaths {
            date
            daily_deaths
          }
          cumulativeUkDeaths {
            date
            cumulative_deaths
          }
          dailyUkCases {
            date
            daily_cases
          }
        }
      `,
    })
    .then((r) => r.data);