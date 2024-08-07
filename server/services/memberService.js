const Member = require('../models/Member');
const { getAsync, setexAsync, delAsync } = require('../utils/redisClient');

const getMembers = async () => {
  const cachedMembers = await getAsync('members');
  if (cachedMembers) {
    return JSON.parse(cachedMembers);
  }

  const members = await Member.find({});
  const membersWithId = members.map(member => ({
    id: member._id.toString(),
    email: member.email,
    imageUrl: member.imageUrl,
    fullname: member.fullname,
    role: member.role,
    address: member.address
  }));

  await setexAsync('members', 3600, JSON.stringify(membersWithId)); // Cache for 1 hour
  return membersWithId;
};

const getMember = async (_, { email }) => {
  const cachedMember = await getAsync(`member:${email}`);
  if (cachedMember) {
    return JSON.parse(cachedMember);
  }

  const member = await Member.findOne({ email });
  if (member) {
    await setexAsync(`member:${email}`, 3600, JSON.stringify({
      id: member._id.toString(),
      email: member.email,
      imageUrl: member.imageUrl,
      fullname: member.fullname,
      role: member.role,
      address: member.address
    })); // Cache for 1 hour
  }
  return member ? { ...member.toObject(), id: member._id.toString() } : null;
};

const addMember = async (_, { email, imageUrl, fullname, role, address }) => {
  const newMember = new Member({ email, imageUrl, fullname, role, address });
  await newMember.save();

  // Clear cache
  await delAsync('members');

  return { ...newMember.toObject(), id: newMember._id.toString() };
};

const updateMember = async (_, { email, imageUrl, fullname, role, address }) => {
  const updatedMember = await Member.findOneAndUpdate(
    { email },
    { imageUrl, fullname, role, address },
    { new: true }
  );

  if (!updatedMember) return null;

  // Clear cache
  await delAsync(`member:${email}`);
  await delAsync('members');

  return { ...updatedMember.toObject(), id: updatedMember._id.toString() };
};

const deleteMember = async (_, { email }) => {
  const deletedMember = await Member.findOneAndDelete({ email });
  if (!deletedMember) return false;

  // Clear cache
  await delAsync(`member:${email}`);
  await delAsync('members');

  return true;
};

module.exports = {
  getMembers,
  getMember,
  addMember,
  updateMember,
  deleteMember
};
