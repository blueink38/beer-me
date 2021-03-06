const { User, Brewery } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, {id}) => {
            if(id) {
                const userData = await User.findOne({_id: id})
                .select('-__v -password')
                .populate('breweries')

                return userData;
            }

            throw new AuthenticationError('Not logged in.')
        },
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('breweries');
        },
        breweries: async () => {
            return await Brewery.find();
          },
        //get brewery by name
        brewery: async (parent, {name}) => {
            return Brewery.findOne({name})
        },
        //get brewery by _id
        breweryId: async (parent, {brewId}) => {
            return Brewery.findOne({brewId})
        },
        //get breweries by city
        breweryCity: async (parent, {city}) => {
            return Brewery.find({city}).sort()
        },
        //get breweries by type
        breweryType: async (parent, {breweryType}) => {
            return Brewery.find({breweryType}).sort()
        },
        //get breweries by state
        breweryState: async (parent, {state}) => {
            return Brewery.find({state}).sort()
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)

            return {token, user};
        },
        deleteUsers: async (parent, args) => {
            await User.deleteMany({})
        },
        addBrewery: async (parent, args) => {
            const brewery = await Brewery.create(args)

            return brewery;
        },
        //brewId = Brewery._id
        addSavedBrewery: async (parent, { brewId, id }) => {
            if (id) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: id},
                    { $addToSet: { breweries: brewId } },
                    { new: true}
                ).populate('breweries');

                return updatedUser;
            } else {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: "60b45e161a08780c1cddb859" },
                    { $addToSet: { breweries: brewId } },
                    { new: true}
                ).populate('breweries');

                return updatedUser;
            }
        },
        removeSavedBrewery: async (parent, { brewId, id }) => {
            if (id) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: id},
                    { $pull: { breweries: brewId } },
                    { new: true}
                ).populate('breweries');

                return updatedUser;
            } else {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: "60b45e161a08780c1cddb859" },
                    { $pull: { breweries: brewId } },
                    { new: true}
                ).populate('breweries');

                return updatedUser;
            }
        },
        login: async (parent, {email,password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
        },
    }
};

module.exports = resolvers;