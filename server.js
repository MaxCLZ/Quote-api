const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Hello`);
});

app.get("/api/quotes/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.status(200).send({ quote: randomQuote });
});

app.get("/api/quotes/", (req, res, next) => {
  const author = req.query.person;
  if (author) {
    const result = quotes.filter((q) => q.person === author);

    if (result.length > 0) {
      res.status(200).send({ quotes: result });
    } else {
      res.status(200).send({ quote: [] });
    }
  } else {
    res.status(200).send({ quotes: quotes });
  }
});

app.post("/api/quotes", (req, res, next) => {
  if (req.query.person && req.query.quote) {
    const newQuote = {
      quote: req.query.quote,
      person: req.query.person,
    };
    quotes.push(newQuote);
    res.status(200).send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});

app.put("/api/quotes", (req, res, next) => {
  if (req.query.person && req.query.quote && req.query.newQuote) {
    const indexOfQuote = quotes.findIndex(
      (q) => q.person === req.query.person && q.quote === req.query.quote
    );
    console.log(indexOfQuote);
    if (indexOfQuote !== -1) {
      quotes[indexOfQuote] = {
        quote: req.query.newQuote,
        person: req.query.person,
      };
      res.status(200).send({ quote: quotes[indexOfQuote] });
    } else {
      res.status(404).send("Quote and/or person not found");
    }
  }
});

app.delete("/api/quotes", (req, res, next) => {
  if (req.query.person && req.query.quote) {
    const indexOfQuote = quotes.findIndex(
      (q) => q.person === req.query.person && q.quote === req.query.quote
    );
    console.log(indexOfQuote);
    if (indexOfQuote !== -1) {
      quotes.splice(indexOfQuote, 1);
      res.status(200).send({ quotes: quotes });
    } else {
      res.status(400).send("Quote and/or person not found");
    }
  } else {
    res.status(400).send("Quote and/or person not found");
  }
});
