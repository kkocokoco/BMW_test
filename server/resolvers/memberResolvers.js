const { getMembers, getMember, addMember, updateMember, deleteMember } = require('../services/memberService');

const resolvers = {
  Query: {
    members: getMembers,
    member: getMember
  },
  Mutation: {
    addMember,
    updateMember,
    deleteMember
  }
};

module.exports = resolvers;
