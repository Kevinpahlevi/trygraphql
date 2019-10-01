const { gql } = require('apollo-server-express');

const typeDefs = gql`
    input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Status{
      status: String
  }

  type Query {
    getMessage(id: ID!): [Message]
    getAll: [Message]
  }

  type Mutation {
    createMessage(input: MessageInput): String
    updateMessage(id: ID!, input: MessageInput): String
  }`;

module.exports = typeDefs;
