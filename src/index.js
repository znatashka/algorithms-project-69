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

  textTerm.forEach((term) => {
    if (term === wordTerm) {
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

function tfidf(index, doc, count, wordTerm) {
  let sum = 0;
  wordTerm.forEach((term) => {
    const tf = doc.textTerm.length / intersectionCount(doc.textTerm, term);
    const idf = Math.log10(count / index[term].length);
    sum += (tf * idf);
  });

  return sum;
}

export default function search(docs, word) {
  if (!word) {
    return [];
  }

  const count = docs.length;

  const wordTerm = word.match(REG_EXP);

  const termDocs = docs.map((doc) => ({
    id: doc.id,
    textTerm: doc.text.match(REG_EXP),
  }));

  const index = {};
  termDocs.forEach((doc) => {
    doc.textTerm.forEach((term) => {
      if (!index[term]) {
        index[term] = [];
      }

      if (!index[term].includes(doc.id)) {
        index[term].push(doc.id);
      }
    });
  });

  return termDocs
    .filter((doc) => hasIntersection(doc.textTerm, wordTerm))
    .map((doc) => ({
      id: doc.id,
      relev: tfidf(index, doc, count, wordTerm),
    }))
    .sort(compare)
    .map((doc) => doc.id);
}
