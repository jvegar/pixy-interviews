---
inject: true
to: configs/jest.config.js
after: projects
---
    '<rootDir>/apps/<%= h.changeCase.param(name) %>',