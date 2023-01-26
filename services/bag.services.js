const Bag = require("../models/Bags");

exports.createBagService = async (data) => {
  const newBag = await Bag.create(data);
  return newBag;
};

exports.findOneBagService = async (id) => {
  const bag = await Bag.findOne({ _id: id });
  return bag;
};

exports.addToBagService = async (data) => {
  const query = {_id: data.bagId}
  const updateData = {$push: {"items": data.item}};
    const bag = await Bag.updateOne(query, updateData)    
    return bag;
  };


exports.updateBagItemService = async (data) => {
  const query = {_id: data.bagId, "items._id": data.itemId}
  const updateData = {$set: {"items.$.quantity": data.quantity}};
    const bag = await Bag.updateOne(query, updateData)    
    return bag;
  };


