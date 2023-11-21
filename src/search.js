// @ts-check

export default (docs, word) => {
  const regExp = /\w+/g;
  const wordTerm = word.match(regExp)[0];

  const termDocs = docs.map((doc) => ({
    id: doc.id,
    textTerm: doc.text.match(regExp),
  }));

  return termDocs
    .filter((doc) => doc.textTerm.includes(wordTerm))
    .map((doc) => doc.id);
};
