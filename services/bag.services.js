const Bag = require("../models/Bags");

exports.createBagService = async (data) => {
  const newBag = await Bag.create(data);
  return newBag;
};

// exports.findOneUserService = async (data) => {
//   const user = await User.findOne({ email: data?.email });
//   return user;
// };

// exports.findAllUserService = async () => {
//   const users = await User.find();
//   return users;
// };

// exports.updateOneUserService = async (data) => {
//   const user = await User.updateOne({ email: data.email }, data.body, {
//     runValidators: true,
//   });
//   return user;
// };

// exports.updateUserRoleService = async (data) => {
//   const user = await User.updateOne({ _id: data._id }, data.body, {
//     runValidators: true,
//   });
//   return user;
// };

// exports.deleteOneUserService = async (id) => {
//   const user = await User.deleteOne({ _id: id });
//   return user;
// };
