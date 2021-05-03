const data = require("../../constants/search.json");

const SearchController = async (req, res) => {
  try {
    const result = data[req.query.search] ? data[req.query.search] : data['default'];
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = SearchController;
