---
to: apps/<%= h.changeCase.param(name) %>/tests/handler.test.ts
---
describe('sample test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
