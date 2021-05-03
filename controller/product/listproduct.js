const Product = require("./../../model/product");
const cache = require("./../../helper/redismanager");

const ListProductController = async (req, res) => {
  try {
    const cacheKey = "listproduct";
    let data = await cache.getCache(cacheKey);

    if (!data) {
      // retrieve data from db
      const products = await Product.aggregate([
        {
          $unwind: {
            path: "$data",
          },
        },
        {
          $group: {
            _id: 1,
            data: {
              $push: "$data",
            },
          },
        },
      ]);
      data = products[0].data;
      await cache.setCache(cacheKey, JSON.stringify(data));
    } else {
      console.log(`data retrieved cache`);
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = ListProductController;
