// @ts-check

export default (docs, word) => docs
  .filter((doc) => doc.text.includes(word))
  .map((doc) => doc.id);
