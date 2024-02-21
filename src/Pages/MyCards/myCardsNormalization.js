// myCardsNormalization.js
const homePageNormalization = (dataFromServer, userId) => {
  return dataFromServer.map((card) => ({
    ...card,
    like: card.likes.includes(userId),
  }));
};

export default homePageNormalization;

