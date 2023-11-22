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

function intersectionCount(textTerm, wordTerm) {
  let i = 0;

  wordTerm.forEach((term) => {
    if (textTerm.includes(term)) {
      i += 1;
    }
  });

  return i;
}

function hasIntersection(textTerm, wordTerm) {
  for (let i = 0; i < wordTerm.length; i += 1) {
    if (textTerm.includes(wordTerm[i])) {
      return true;
    }
  }

  return false;
}

function toRelev(doc, wordTerm) {
  let relev = intersectionCount(doc.textTerm, wordTerm);

  wordTerm.forEach((wTerm) => {
    doc.textTerm.forEach((term) => {
      if (term === wTerm) {
        relev += 1;
      }
    });
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

  const wordTerm = word.match(REG_EXP);

  const termDocs = docs.map((doc) => ({
    id: doc.id,
    textTerm: doc.text.match(REG_EXP),
  }));

  return termDocs
    .filter((doc) => hasIntersection(doc.textTerm, wordTerm))
    .map((doc) => toRelev(doc, wordTerm))
    .sort(compare)
    .map((doc) => doc.id);
};
