import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { sum } from '../index.js';

describe('sum tests suite', () => {
  it('should sum 2 number', () => {
    assert.equal(sum(1, 2), 3);
  });

  it('should throw error if arguments are not numbers', () => {
    assert.throws(() => sum('a', 'b'), TypeError);
  });
});
