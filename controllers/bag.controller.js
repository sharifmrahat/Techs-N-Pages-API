const bagService = require("../services/bag.services");
const userService = require("../services/user.service");

// exports.createBag = async (req, res, next) => {
//   try {
//     const { email } = req.user;
//     const user = await userService.findOneUserService({ email });
//     const newBag = await bagService.createBagService({...req.body, user: {email, _id: user._id}});
//     res.status(200).json({ success: true, data: newBag });
//   } catch (error) {
//     next(error);
//   }
// };
