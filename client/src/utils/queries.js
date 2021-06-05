import gql from 'graphql-tag';

export const QUERY_ME = gql`
  query me($id: String!){
    me(id:$id) {
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
  query{
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

export const QUERY_ALL_BREWERIES = gql `
  {
    breweries{
      _id
      name  
      breweryType
      street
      address2
      address3
      city
      state
      longitude
      latitude
      phone
      websiteUrl
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

export const QUERY_BREWERY_BY_ID = gql `
  query breweryId($brewId: ID!){
    breweryId(brewId: $id){
      _id
      name
      breweryType
      street
      address2
      address3
      city
      state
      longitude
      latitude
      phone
      websiteUrl
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