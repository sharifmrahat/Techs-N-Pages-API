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

exports.getMyBag = async (req, res, next) => {
  try {
    const { email } = req.user;
    const {id} = req.params

    const currentBag = await bagService.findOneBagService(id);

    if(currentBag.user.email !== email){
      return res
          .status(400)
          .json({
            success: false,
            error: "You're not authorized to access the bag",
          });
    }
    res.status(200).json({ success: true, data: currentBag });
  } catch (error) {
    next(error);
  }
};

exports.addToBag = async (req, res, next) => {
  try {
    const loggedEmail = req.user?.email;
    console.log(loggedEmail)
    const loggedUser = await userService.findOneUserService({
      email: loggedEmail,
    });
    if (loggedUser.email !== loggedEmail) {
      return res
        .status(400)
        .json({
          success: false,
          error: "You're not authorized to add to bag",
        });
    }

    const data = {
      bagId: req?.params.bagId,
      item: req?.body
    }

    const bag = await bagService.findOneBagService(data.bagId)

    if(bag?.user?.email !== loggedUser?.email){
      return res
        .status(400)
        .json({
          success: false,
          error: "You're not authorized to access the bag",
        });
    }
    const itemExist = bag?.items?.find(item => item.uid === data.item.uid)
    if(itemExist){
      return res
      .status(400)
      .json({
        success: false,
        error: data.item.name+' is already added to your bag',
      });
    }
    const updatedBagItems = await bagService.addToBagService(data);

    if (!updatedBagItems.modifiedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Nothing has modified" });
    }
    res.status(200).json({ success: true, data: updatedBagItems });
  } catch (error) {
    next(error);
  }
};

exports.updateBagItem = async (req, res, next) => {
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
        quantity: req?.body.quantity,
      }

      const bag = await bagService.findOneBagService(data.bagId)
      if(bag?.user?.email !== loggedUser?.email){
        return res
          .status(400)
          .json({
            success: false,
            error: "You're not authorized to access the bag",
          });
      }
      const updatedBag = await bagService.updateBagItemService(data);
  
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

exports.deleteBagItem = async (req, res, next) => {
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
            error: "You're not authorized to add to bag",
          });
      }
  
      const data = {
        bagId: req?.params.bagId,
        itemId: req?.params.itemId
      }
  
      const bag = await bagService.findOneBagService(data.bagId)
  
      if(bag?.user?.email !== loggedUser?.email){
        return res
          .status(400)
          .json({
            success: false,
            error: "You're not authorized to access the bag",
          });
      }
      const deleteBagItems = await bagService.deleteBagItemService(data);
  
      if (!deleteBagItems.modifiedCount) {
        return res
          .status(400)
          .json({ success: false, error: "Nothing has modified" });
      }
      res.status(200).json({ success: true, data: deleteBagItems });
    } catch (error) {
      next(error);
    }
  };