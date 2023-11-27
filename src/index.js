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

function termCount(textTerm, wordTerm) {
  let i = 0;

  textTerm.forEach((term) => {
    if (term === wordTerm) {
      i += 1;
    }
  });

  return i;
}

function tfidf(index, doc, count, wordTerm) {
  let sum = 0;

  wordTerm.forEach((term) => {
    const docsCount = index[term].length;

    const tf = termCount(doc.textTerm, term) / doc.textTerm.length;
    const idf = Math.log2(1 + (count - docsCount + 1) / (docsCount + 0.5));
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
    .map((doc) => ({
      id: doc.id,
      relev: tfidf(index, doc, count, wordTerm),
    }))
    .sort(compare)
    .map((doc) => doc.id);
}
