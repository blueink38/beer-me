const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        breweries: [Brewery]
    }

    type Brewery {
        _id: ID
        name: String
        breweryID: Int
        breweryType: String
        street: String
        address2: String
        address3: String
        city: String
        state: String
        countyProvince: String
        postalCode: String
        country: String
        longitude: String
        latitude: String
        phone: String
        websiteUrl: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me(id: String!): User
        users: [User]
        breweries: [Brewery]
        brewery(name: String!): Brewery
        breweryId(brewId: ID!): Brewery
        breweryCity(city: String!): [Brewery]
        breweryType(breweryType: String!): [Brewery]
        breweryState(state: String!): [Brewery]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        deleteUsers: User
        addBrewery(
            name: String!, breweryID: Int!, breweryType: String,
            street: String, address2: String, address3: String,
            city: String, state: String, countyProvince: String, postalCode: String,
            country: String, longitude: String, latitude: String, phone: String,
            websiteUrl: String 
        ): Brewery
        addSavedBrewery(brewId: ID!, id: String!): User
        removeSavedBrewery(brewId: ID!, id: String!): User
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;