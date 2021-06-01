import gql from 'graphql-tag';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      breweries {
        _id
      }
    }
  }
`;

export const QUERY_USERS = gql `
  {
    users{
      _id
      username
      email
      breweries {
        _id
      }
    }
  }
`;

export const QUERY_BREWERY = gql `
  query brewery($name: String!){
    brewery(name: $name){
      _id
    }
  }
`;

export const QUERY_BREWERY_BY_CITY = gql `
  query breweryCity($city: String!) {
    breweryCity(city: $city) {
      _id
    }
  }
`;

export const QUERY_BREWERY_BY_TYPE = gql `
  query breweryType($breweryType: String!) {
    breweryType(breweryType: $breweryType) {
      _id
    }
  }
`;

export const QUERY_BREWERY_BY_STATE = gql `
  query breweryState($state: String!) {
    breweryState(state: $state) {
      _id
    }
  }
`;