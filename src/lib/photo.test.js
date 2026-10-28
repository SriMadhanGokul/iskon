// Runtime validation coverage for responsive local photo paths.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { photo } from './photo.js';

describe('photo', () => {
  it('uses the 1280px image and offers responsive local variants', () => {
    assert.deepEqual(photo('/images/temple-photo.webp', '100vw'), {
      src: '/images/temple-photo-1280.webp',
      srcSet: '/images/temple-photo-640.webp 640w, /images/temple-photo-1280.webp 1280w, /images/temple-photo-1920.webp 1920w',
      sizes: '100vw',
    });
  });

  it('leaves non-local image paths unchanged', () => {
    assert.deepEqual(photo('https://example.com/photo.webp', '50vw'), {
      src: 'https://example.com/photo.webp',
    });
  });
});
