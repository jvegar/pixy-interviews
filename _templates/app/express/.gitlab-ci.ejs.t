---
to: apps/<%= h.changeCase.param(name) %>/.gitlab-ci.yml
---
include: 'configs/templates.gitlab-ci.yml'

image: node:lts

variables:
  APP_PATH: 'apps/<%= h.changeCase.param(name) %>'

stages:
  - test
  - deploy

test:
  stage: test
  script:
    - yarn lint $APP_PATH
    - yarn test $APP_PATH

deploy_dev:
  stage: deploy
  extends: .env_dev
  script:
    - cd $APP_PATH
    - yarn sls deploy -v

deploy_stg:
  stage: deploy
  extends: .env_stg
  script:
    - cd $APP_PATH
    - yarn sls deploy -v -s stg

deploy_prod:
  stage: deploy
  extends: .env_prod
  script:
    - cd $APP_PATH
    - yarn sls deploy -v -s prod
