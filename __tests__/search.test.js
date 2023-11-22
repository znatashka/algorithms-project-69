// @ts-check

import {
  describe, expect, it,
} from '@jest/globals';
import search from '../index.js';

describe('search', () => {
  it.each([
    ['', []],
    ['shoot', []],
  ])('empty', (word, result) => {
    const res = search([], word);

    expect(res).toHaveLength(0);
    expect(res).toEqual(result);
  });

  it.each([
    ['shoot', ['doc2', 'doc1']],
    ['pint!', ['doc1']],
    ['shoot at me', ['doc2', 'doc1']],
  ])('word %p expecting %p', (word, result) => {
    const docs = [
      { id: 'doc1', text: 'I can\'t shoot straight unless I\'ve had a pint!' },
      { id: 'doc2', text: 'Don\'t shoot shoot shoot that thing at me.' },
      { id: 'doc3', text: 'I\'m your shooter.' },
    ];

    const res = search(docs, word);

    expect(res).not.toHaveLength(0);
    expect(res).toEqual(expect.arrayContaining(result));
  });
});
