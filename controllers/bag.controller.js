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


exports.updateBag = async (req, res, next) => {
    try {
      const loggedEmail = req.user?.email;
  
      const loggedUser = await userService.findOneUserService({
        email: loggedEmail,
      });
      if (loggedUser.email !== loggedEmail) {
        return res
          .status(400)
          .json({
            success: false,
            error: "You're not authorized to update data",
          });
      }
      const data = {
        bagId: req?.params.bagId,
        itemId: req?.params.itemId,
        body: req?.body,
      }
      const updatedBag = await bagService.updateBagService(data);
  
      if (!updatedBag.modifiedCount) {
        return res
          .status(400)
          .json({ success: false, error: "Nothing has modified" });
      }
      res.status(200).json({ success: true, data: updatedBag });
    } catch (error) {
      next(error);
    }
  };
  