---
to: packages/<%= h.changeCase.param(name) %>/tests/index.test.ts
---
describe('sample test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
