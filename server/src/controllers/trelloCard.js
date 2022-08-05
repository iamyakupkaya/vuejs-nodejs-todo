const axios = require("axios").default;

// CREATE A TRELLO CARD
const createTrelloCard = async (result) => {
  const URL = `https://api.trello.com/1/cards?idList=${process.env.ID_LIST}&key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`;
  const cardData = await axios.post(URL, {
    name: result.title,
    desc: result.content,
  });

  return cardData;
};

// DELETE THE TRELLO CARD WHICH GIVEN THE ID NUM.
const deleteTrelloCard = async (todo) => {
  const CardID = todo.virtualID;
  const URL = `https://api.trello.com/1/cards/${CardID}?key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`;
  const cardData = await axios.delete(URL);
  return cardData;
};

// UPDATE THE TRELLO CARD WHICH GIVEN THE ID NUM.
const updateTrelloCard = async (todo) => {
  const CardID = todo.virtualID;
  const URL = `https://api.trello.com/1/cards/${CardID}?key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`;
  const cardData = await axios.put(URL, {
    name: todo.title,
    desc: todo.content,
  });

  return cardData;
};

module.exports = {
  createTrelloCard,
  deleteTrelloCard,
  updateTrelloCard,
};
