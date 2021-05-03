const fetch = require("node-fetch");
const Product = require("./../../model/product");
const cache = require("./../../helper/redismanager");
const generatePdf = require("./../../helper/pdfgenerator");

const GetProductController = async (req, res) => {
  try {
    const search = req.query.search;
    let data = await cache.getCache(search);
    console.log(`incoming param : ${search}`);

    if (!data) {
      // retrieve data from db
      const product = await Product.findOne({ query: search });
      if (product) {
        console.log(`data retrieved from db`);
        data = product.data;
      } else {
        // retrieve data from external source
        const response = await fetch(
          `http://localhost:3001/api/external?search=${search}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const json = await response.json();
          if (Array.isArray(json)) {
            data = [
              { ...json[0], url: `http://localhost:3001/public/${search}.pdf` },
              { ...json[1], url: `http://localhost:3001/public/${search}.pdf` },
            ];
          }
        }

        await generatePdf(data, search);
        // update data in db
        let newProduct = new Product({
          query: search,
          data,
        });
        await newProduct.save();
        console.log(`data retrieved external api`);
      }

      await cache.setCache(search, JSON.stringify(data));
    } else {
      console.log(`data retrieved cache`);
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = GetProductController;
