// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'select',
    name: 'type',
    message: 'Branch type: ',
    choices: ['feature', 'bugfix', 'hotfix'],
  },
  {
    type: 'input',
    name: 'name',
    message: 'Branch name:',
  },
];
