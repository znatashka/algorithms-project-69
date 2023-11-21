// @ts-check

import {
  describe, expect, it, test,
} from '@jest/globals';
import search from '../index.js';

describe('search', () => {
  test('empty', () => {
    expect(search([], 'shoot')).toHaveLength(0);
  });

  it.each([
    ['shoot', ['doc1', 'doc2']],
    ['pint!', ['doc1']],
  ])('word %p expecting %p', (word, result) => {
    const docs = [
      { id: 'doc1', text: 'I can\'t shoot straight unless I\'ve had a pint!' },
      { id: 'doc2', text: 'Don\'t shoot shoot shoot that thing at me.' },
      { id: 'doc3', text: 'I\'m your shooter.' },
    ];

    const res = search(docs, 'shoot');

    expect(res).not.toHaveLength(0);
    expect(res).toEqual(expect.arrayContaining(result));
  });
});
