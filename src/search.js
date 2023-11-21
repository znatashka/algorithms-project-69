// @ts-check

const REG_EXP = /\w+/g;

function compare(a, b) {
  if (a.relev < b.relev) {
    return -1;
  }
  if (a.relev > b.relev) {
    return 1;
  }
  return 0;
}

function toRelev(doc, wordTerm) {
  let relev = 0;
  doc.textTerm.forEach((term) => {
    if (term === wordTerm) {
      relev += 1;
    }
  });

  return {
    id: doc.id,
    relev,
  };
}

export default (docs, word) => {
  if (!word) {
    return [];
  }

  const wordTerm = word.match(REG_EXP)[0];

  const termDocs = docs.map((doc) => ({
    id: doc.id,
    textTerm: doc.text.match(REG_EXP),
  }));

  return termDocs
    .filter((doc) => doc.textTerm.includes(wordTerm))
    .map((doc) => toRelev(doc, wordTerm))
    .sort(compare)
    .map((doc) => doc.id);
};
