const axios = require("axios").default;

const createTrelloCard = async (result) => {
  const APIKey = "9c53c078a6a34ea3df76fac6362852b9";
  const APIToken = "c139f5861c4b03e33fa0fada9a310cfa41e61b5b2d982f8bccb58d3b60f75e59";
  const idList = "62ebb7cd60057a20b6c8b134";
  const URL = `https://api.trello.com/1/cards?idList=${idList}&key=${APIKey}&token=${APIToken}`;
  const cardData = await axios.post(URL, {
    name: result.title,
    desc: result.content,
  });

  return cardData;
};

const deleteTrelloCard = async (todo) => {
  const APIKey = "9c53c078a6a34ea3df76fac6362852b9";
  const APIToken = "c139f5861c4b03e33fa0fada9a310cfa41e61b5b2d982f8bccb58d3b60f75e59";
  const CardID = todo.virtualID;
  const URL = `https://api.trello.com/1/cards/${CardID}?key=${APIKey}&token=${APIToken}`;
  const cardData = await axios.delete(URL);
  return cardData;
};

const updateTrelloCard = async (todo) => {
  const APIKey = "9c53c078a6a34ea3df76fac6362852b9";
  const APIToken = "c139f5861c4b03e33fa0fada9a310cfa41e61b5b2d982f8bccb58d3b60f75e59";
  const CardID = todo.virtualID;
  const URL = `https://api.trello.com/1/cards/${CardID}?key=${APIKey}&token=${APIToken}`;
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
