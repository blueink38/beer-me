const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Brewery {
        _id: ID
        name: String
        breweryType: String
        street: String
        address2: String
        adress3: String
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
        me: User
        brewery(name: String!): Brewery
        breweryCity(city: String!): [Brewery]
        breweryType(breweryType: String!): [Brewery]
        breweryState(state: String!): [Brewery]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;