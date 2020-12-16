---
inject: true
to: configs/.gitlab-ci.yml
append: true
---
#
<%= h.changeCase.param(name) %>:
  stage: apps
  trigger:
    include: apps/<%= h.changeCase.param(name) %>/.gitlab-ci.yml
  rules:
    - changes:
        - apps/<%= h.changeCase.param(name) %>/**/*