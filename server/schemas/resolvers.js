const { User, Brewery } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({})
                .select('-__v -password')

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
        //get brewery by name
        brewery: async (parent, {name}) => {
            return Brewery.findOne({name})
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
        addSavedBrewery: async (parent, { brewId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
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