const Bag = require("../models/Bags");

exports.createBagService = async (data) => {
  const newBag = await Bag.create(data);
  return newBag;
};

exports.findOneBagService = async (id) => {
  const bag = await Bag.findOne({ _id: id });
  return bag;
};

exports.updateBagService = async (data) => {

  const query = { _id: data.bagId, "items._id": data.itemId };
  const updateData = {
    $set: { "items.$.quantity": data.quantity }
  };
  console.log(query, updateData)
    const bag = await Bag.updateOne(query, updateData)    
    return bag;
  };
