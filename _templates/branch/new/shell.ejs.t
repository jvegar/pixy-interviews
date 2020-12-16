---
sh: '
 git checkout -b <%= type %>/<%= h.changeCase.param(name) %> && 
 git commit --allow-empty --no-verify -m "init" &&
 git push --set-upstream origin <%= type %>/<%= h.changeCase.param(name) %>
'
---


