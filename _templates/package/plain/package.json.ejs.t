---
to: packages/<%= h.changeCase.param(name) %>/package.json
---
{
  "name": "@packages/<%= h.changeCase.param(name) %>",
  "version": "0.0.1",
  "license": "MIT",
  "private": true,
  "main": "index.ts",
   "scripts": {
    "test": "yarn --cwd ../../ test packages/<%= h.changeCase.param(name) %>"
  }
}

