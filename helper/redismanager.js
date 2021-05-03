const redis = require("redis");
const { promisifyAll } = require("bluebird");
promisifyAll(redis);

let client;
const initializeCache = () => {
  client = redis.createClient({
    host: "redis-12815.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 12815,
    password: "rdTzlZk1AgdjQGqbSfUfAOHUIcm13miQ",
  });

  client.on("connect", () => {
    console.log("redis connected");
  });

  client.on("error", (err) => {
    console.log("Error in Redis connection, " + err);
    process.exit(1);
  });
};

const setCache = async (key, value) => {
  await client.setAsync(key, value);
};

const getCache = async (key) => {
  const data = await client.getAsync(key);
  return JSON.parse(data);
};

const exitCache = () => {
  client.quit();
  console.log("redis connection closed");
};

module.exports = initializeCache;
module.exports.exitCache = exitCache;
module.exports.getCache = getCache;
module.exports.setCache = setCache;