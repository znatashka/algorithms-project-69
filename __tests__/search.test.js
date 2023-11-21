// @ts-check

import { describe, expect, test } from '@jest/globals';
import search from '../index.js';

describe('search', () => {
  test('empty', () => {
    expect(search([], 'shoot')).toHaveLength(0);
  });

  test('with result', () => {
    const docs = [
      { id: 'doc1', text: 'I can\'t shoot straight unless I\'ve had a pint!' },
      { id: 'doc2', text: 'Don\'t shoot shoot shoot that thing at me.' },
      { id: 'doc3', text: 'I\'m your shooter.' },
    ];

    const result = search(docs, 'shoot');

    expect(result).not.toHaveLength(0);
    expect(result).toEqual(expect.arrayContaining(['doc1', 'doc2']));
  });
});
