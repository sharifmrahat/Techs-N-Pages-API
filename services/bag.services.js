const Bag = require("../models/Bags");

exports.createBagService = async (data) => {
  const newBag = await Bag.create(data);
  return newBag;
};

exports.updateBagService = async (data) => {
    const bag = await Bag.updateOne({ _id: data?.bagId }, data.body, {
      runValidators: true,
    });
    return bag;
  };
