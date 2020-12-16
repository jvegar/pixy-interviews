[![N|Solid](https://shiftpixy.com/wp-content/uploads/2020/01/Logo-with-circle-R-small.png)](https://shiftpixy.com/)

## START HERE! Video Tutorials:
- Introduction: https://vimeo.com/491698201
- Local Setup: https://vimeo.com/491703385
- Project Overview & Deployments: https://vimeo.com/491764292


**Table of contents:**

- [Take Home Interview Project](#take-home-interview-project)
- [About The Repository](#about-the-repository)
  - [Folder Structure](#folder-structure)
  - [Monorepo 101 (WIP)](#monorepo-101-wip)
  - [Package publishing (WIP)](#package-publishing-wip)
- [Dependencies](#dependencies)
- [Code standards](#code-standards)
- [Commit Messages](#commit-messages)
- [Code generation](#code-generation)
- [Getting started](#getting-started)
- [Testing](#testing)
- [Other resources](#other-resources)

## Take Home Interview Project

This interview project you are participating in will help you better demonstrate your level of expertise than if we asked you to code something for us on the fly. You will have time to architect and build something without as much of a time restriction allowing you to showcase your knowledge in a more meaningful way.

Clone this repsository and submit your changes as a merge request.

Showcase Requirements:

- Choose a 3rd party service with an open API (or free developer account) to integrate with. The choice here is not important - we’re interested in _what you build_ rather than _what you pick_.
- Create a service that will facilitate integration with that 3rd party service.
- Demonstrate understanding of SOLID design principles.
- Implement clear error handling so that your requests run to completion and also deliver meaningful information to the logs (errors and info alike) while being mindful of PII (personally identifiable information).
- Add your own flair to show us what you know - impress us!

Technical Requirements:

- Your service needs to have its own API gateway.
- Your service does not need to implement authentication & authorization. A simple API key on the gateway will be fine.
- Your service needs to have a data store. Redis and DynamoDB are good choices, but there are other storage solutions in AWS as well.
  - You are free to use the data store for whatever purpose you like - surprise us.

## About The Repository

**Welcome to the ShiftPixy interview project monorepo**

Currently, the monorepo supports both JS/TS out of the box, right now it's strongly focused in [serverless](https://www.serverless.com/). In the configs folder we have some default files that are used across packages/apps, like a webpack config to bundle the lambda function, jest config for tests, etc. This allows us to have a standard between all packages, but you can create/override this config per app.

### Folder Structure

    .
    ├── _templates          # code generation templates
    ├── apps                # services that are deployed to AWS
    ├── configs             # default configurations for webpack, jest, GitLab-ci, etc.
    ├── packages.           # shared libraries
    ├── .eslintrc
    ├── .gitignore
    ├── .prettierrc
    ├── lerna.json
    ├── package.json
    ├── tsconfig.json
    └── README.md

### Monorepo 101 (WIP)

The core feature of the monorepo is the ability to hoist our private packages to the root node_modules folder,
this allows us to import our package as it was a npm package, without the need to setup path aliases, like:

```javascript
import utils from '@packages/utils';
```

To do this we rely on a feature of yarn called [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/), please read their documentation to know more.

Another important feature of the monorepo is the ability to track our local dependencies, do versioning and know what packages were affected by a change, and in order to do that we rely on a package called [lerna](https://github.com/lerna/lerna).

### Package publishing (WIP)

Our packages are shared code that we can use in many apps, for example, think in a Database helper package. Also packages can be published to GitLab registry allowing us to share code with other repositories (usually with the frontend). When you scaffold a package you can select if it will be a private package (not publishable) or a public package (don't get confuse by the name public, our registry is private and need credentials to access the packages).

## Dependencies

In the root package.json we try to keep only default packages that are regarding to testing, eslint, webpack, etc. Each project specifies your own dependencies in their package.json file, when you run yarn install from the root folder all the packages (even the project specific dependencies) are hoisted to the root node_modules.

## Code standards

To keep the code standards we are currently using:

- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [husky](https://www.npmjs.com/package/husky)
- [lint-staged](https://github.com/okonet/lint-staged)

We are using sane defaults to avoid tweaking those things so much, you're welcome to suggest changes in the lint/prettier rules.

Also there is a pre commit hook that lints/beautify our code.

## Commit Messages

We are using [commitizen](https://github.com/commitizen/cz-cli) to ensure a pattern in the commit messages (in this case, the [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/)), when you commit with Commitizen, you'll be prompted to fill out any required commit fields at commit time.

In order to commit using commitizen use the following command:

```
yarn commit
```

Why we are using this? because when you follow this commit message pattern, lerna will be able to bump version automatically (when you run **lerna version** command) based on the commits, besides that it will generate a CHANGELOG.md automatically as well.

## Code generation

Setting up a new app is a boring task, therefore we do code generation through [hygen](https://www.npmjs.com/package/hygen), the templates are versioned and are inside the \_templates folder, therefore you're welcome to improve and extend them.

```shell
# list all available code generation commands
yarn new

# example: generate a new express app
yarn new app express

# example: generate a new package
yarn new package
```

## Getting started

```shell
# from root folder
# install all dependencies, this will install even dependencies from nested package.json files, and also will hoist our private packages to node_modules.
yarn

# create a new branch for your task
yarn branch new

# generate a new app and follow the steps
yarn new app express

# start serverless offline (run lambda locally)
yarn start @apps/<app-name>
# or
cd apps/<app-name>
yarn start
```

## Testing

To do unit/integration tests we're using [jest](https://jestjs.io/), in the root folder we have a common jest config that can be used by both TS/JS apps.

```shell
# run all test suites
yarn test

# test specific app (from root folder)
yarn test <app-name>

# test specific app (from their folder)
yarn test
```

## Other resources

- [serverless.yml reference](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/) - all available properties in serverless.yml
- [serverless stack](https://serverless-stack.com/) - good resources regarding serverless in general
- [serverless first](https://serverlessfirst.com/articles/) - another one regarding serverless in general
- [why we are bundling with webpack?](https://www.gorillastack.com/news/optimizing-your-lambda-cold-starts-with-serverless-webpack/)
- [serverless cache](https://theburningmonk.com/2019/10/all-you-need-to-know-about-caching-for-serverless-applications/)
