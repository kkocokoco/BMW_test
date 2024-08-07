const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Member {
    id: ID!
    email: String!
    imageUrl: String!
    fullname: String!
    role: String!
    address: String!
  }

  type Query {
    members: [Member]
    member(email: String!): Member
  }

  type Mutation {
    addMember(email: String!, imageUrl: String!, fullname: String!, role: String!, address: String!): Member
    updateMember(email: String!, imageUrl: String, fullname: String, role: String, address: String): Member
    deleteMember(email: String!): Boolean
  }
`;

module.exports = typeDefs;
