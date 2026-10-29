// Runtime validation coverage for the public navigation links.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { SITE_NAV_GROUPS, SITE_NAV_LINKS } from './pages.js';

const hiddenNavigationPaths = ['/mandir', '/prabhupada', '/activities', '/get-involved'];

describe('site navigation', () => {
  it('does not expose the requested pages in primary or footer navigation', () => {
    const navigationPaths = [
      ...SITE_NAV_LINKS.map(({ to }) => to),
      ...SITE_NAV_GROUPS.flatMap(({ to, links }) => [to, ...links.map(({ to: linkTo }) => linkTo)]),
    ];

    for (const hiddenPath of hiddenNavigationPaths) {
      assert.equal(navigationPaths.some((path) => path === hiddenPath || path.startsWith(`${hiddenPath}#`)), false);
    }
  });
});
