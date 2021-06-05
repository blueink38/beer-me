import gql from 'graphql-tag';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN = gql `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const DELETE_USERS = gql `
  mutation deleteUsers{
    deleteUsers{
      username
    }
  }
`;

export const ADD_BREWERY_TO_DB = gql `
  mutation addBrewery($name: String!, $breweryID: Int!, $breweryType: String!, 
    $street: String, $address2: String, $address3: String, 
    $city: String, $state: String, $countyProvince: String, 
    $postalCode: String, $country: String, $longitude: String, 
    $latitude: String, $phone: String, $websiteUrl: String) {
    addBrewery(name: $name, breweryID: $breweryID, breweryType: $breweryType, 
      street: $street, address2: $address2, address3: $address3, 
      city: $city, state: $state, countyProvince: $countyProvince, 
      postalCode: $postalCode, country: $country, longitude: $longitude, 
      latitude: $latitude, phone: $phone, websiteUrl: $websiteUrl) {
        name
        breweryID
        breweryType
        street
        address2
        address3
        city
        state
        countyProvince
        postalCode
        country
        longitude
        latitude
        phone
        websiteUrl
    }
  }
`;

export const SAVE_BREWERY_TO_USER = gql `
  mutation addSavedBrewery($brewId: ID!, $id: String!){
    addSavedBrewery(brewId: $brewId, id: $id){
      breweries{
        name
      }
    }
  }
`;

export const REMOVE_BREWERY_FROM_USER = gql `
  mutation removeSavedBrewery($brewId: ID!, $id: String!){
    removeSavedBrewery(brewId: $brewId, id: $id){
      breweries{
        name
      }
    }
  }
`;