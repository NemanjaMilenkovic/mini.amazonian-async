const fs = require("fs");
// eslint-disable-next-line no-unused-vars
const { readFile, produceResult } = require("./helpers");

class ReviewBuilder {
  buildReviewsSync() {
    const products = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    return produceResult({ products, reviews, users });
  }

  buildReviewsCallbacks(cb) {
    fs.readFile("./data/products.json", "utf8", (err, products) => {
      if (err) throw err;
      fs.readFile("./data/reviews.json", "utf8", (err, reviews) => {
        if (err) throw err;
        fs.readFile("./data/users.json", "utf8", (err, users) => {
          if (err) throw err;
          products = JSON.parse(products);
          reviews = JSON.parse(reviews);
          users = JSON.parse(users);
          cb(produceResult({ products, reviews, users }));
        });
      });
    });
  }

  buildReviewsPromises() {
    const products = new Promise((resolve, reject) => {
      fs.readFile("./data/products.json", "utf8", (err, products) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(products));
        }
      });
    });
    const reviews = new Promise((resolve, reject) => {
      fs.readFile("./data/reviews.json", "utf8", (err, reviews) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(reviews));
        }
      });
    });
    const users = new Promise((resolve, reject) => {
      fs.readFile("./data/users.json", "utf8", (err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(users));
        }
      });
    });

    return Promise.all([products, reviews, users]).then((results) => {
      const products = results[0];
      const reviews = results[1];
      const users = results[2];
      return produceResult({ products, reviews, users });
    });
  }

  async buildReviewsAsyncAwait() {
    const products = JSON.parse(await readFile("./data/products.json"));
    const reviews = JSON.parse(await readFile("./data/reviews.json"));
    const users = JSON.parse(await readFile("./data/users.json"));

    return produceResult({ products, reviews, users });
  }
}

module.exports = ReviewBuilder;
