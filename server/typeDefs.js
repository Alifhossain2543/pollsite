const { gql } = require('apollo-server')
const { GraphQLScalarType, Kind } = require('graphql')
// const Comment = require('./models/Comment')
// const Prize = require('./models/Prize')
// const TextSurvey = require('./models/Survey/TextSurvey')
// const RatingSurvey = require('./models/Survey/RatingSurvey')


const typeDefs = gql `
    scalar Date
    scalar Upload

    type Token {
        token: String
    }

    type User{
        username: String,
        email: String,
        contactNo: String,
        password: String,
        points: Int,
        surveyDoneId: [String]
        isAdmin: Boolean,
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
        url: String!
    }

    type Prize {
        id: ID,
        title: String,
        image: String
        condition: Int
    }

    type Comment {
        id: ID,
        pollId: String,
        description: String,
        date: Date,
        authorId: String
    }
    
    type Option {
        id: ID,
        name: String,
        resultQuantity: Int
    } 
    
    type Poll {
        id: ID,
        question: String,
        options: [Option]
        image: String
        timeLimit: Int
        dateCreated: Date
    }
    
    type TextSurveyQNA {
        id: ID,
        question: String,
        answer: [String]
    }

    type TextSurvey {
        id: ID,
        survey: [TextSurveyQNA],
        dateCreated: Date,
        timeLimit: Int,
        pointsEarned: Int
    }

    type RatingQNA {
        id: ID,
        question: String,
        rate: [Int]
    }

    type RatingSurvey {
        id: ID,
        survey: [RatingQNA],
        dateCreated: Date,
        timeLimit: Int,
        pointsEarned: Int
    }

    type OptionQNA {
        id: ID,
        question: String,
        options: [Option]
    }

    type OptionSurvey {
        id: ID,
        survey: [OptionQNA],
        dateCreated: Date,
        timeLimit: Int,
        pointsEarned: Int
    }

    type Query{
        getAllPrizes: [Prize]
        getAllComments: [Comment]
        getAllPoll: [Poll]
        getPoll(id: ID): Poll
        getAllTextSurvey: [TextSurvey]
        getTextSurvey(id: ID): TextSurvey
        getAllRatingSurvey: [RatingSurvey]
        getRatingSurvey(id: ID): RatingSurvey
        getAllOptionSurvey: [OptionSurvey]
        getOptionSurvey(id:ID): OptionSurvey
    }

    input PrizeInput {
        title: String,
        condition: Int
    }

    input CommentInput {
        description: String
    }

    input OptionInput {
        name: String,
    }

    input PollInput{
        question: String,
        options: [OptionInput]
        timeLimit: Int
    }

    input SurveyInput{
        question: String,
    }

    input TextSurveyInput{
        survey: [SurveyInput]
        timeLimit: Int
        pointsEarned: Int
    }

    input AnswerInput {
        answer: String
    }

    input RatingInput{
        survey: [SurveyInput]
        timeLimit: Int
        pointsEarned: Int
    }

    input RateInput {
        rate: Int
    }

    input OptionSurveyOptionsInput {
        id: ID,
        question: String,
        options: [OptionInput]
    }

    input OptionSurveyInput {
        survey: [OptionSurveyOptionsInput]
        timeLimit: Int
        pointsEarned: Int
    }

    input RegisterInput {
        username: String,
        email: String,
        contactNo: String,
        password: String
    }

    input LoginInput {
        username: String,
        password: String
    }

    type Mutation {
        register(user: RegisterInput): User
        login(user: LoginInput): Token

        createPrize(prize: PrizeInput): Prize
        updatePrize(id: ID, prize: PrizeInput): Prize
        deletePrize(id: ID): Prize

        createComment(pollId: ID, comment: CommentInput): Comment
        deleteComment(id: ID): Comment

        createPoll(poll: PollInput): Poll
        answerPoll(id: ID, optionId: ID): Poll
        deletePoll(id: ID): Poll

        createTextSurvey(textSurvey: TextSurveyInput): TextSurvey
        deleteTextSurvey(id: ID): TextSurvey
        answerTextSurvey(id: ID, questionId: ID, answer: AnswerInput): TextSurvey

        createRatingSurvey(rating: RatingInput): RatingSurvey
        deleteRatingSurvey(id: ID): RatingSurvey
        answerRatingSurvey(id: ID, questionId: ID, rating: RateInput): RatingSurvey

        createOptionSurvey(optionSurvey: OptionSurveyInput): OptionSurvey
        deleteOptionSurvey(id: ID): OptionSurvey
        answerOptionSurvey(id: ID, questionId: ID, optionId: ID): OptionSurvey

        imageUpload(file: Upload!): File
    }
`

module.exports = typeDefs