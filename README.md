# Detector Contract

![Licença](https://img.shields.io/badge/license-MIT-brightgreen)

## About

<p align="center">Project which allows to search for vulnerabilities in Smart Contracts</p>


## Table of Contents
=================

   * [About](#about)
   * [Table of Contents](#table-of-contents)
   * [Project Description](#-project-description)
   * [Prerequisites](#-prerequisites)
   * [Installation](#-installation)
   * [How to use](#-how-to-use)
   * [TODO list](#-todo-list)
   * [Author](#-author)

---

## 💻 Project Description

The project was developed to provide an API to search for vulnerabilities in smart contracts. It was developed with [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/), using [Husky](https://typicode.github.io/husky/#/), [lint-staged](https://github.com/okonet/lint-staged), [eslint](https://eslint.org/), [prettier](https://prettier.io/) and [commitlint](https://commitlint.js.org/#/) with [conventional commits](conventionalcommits.org/).

**Currently only two vulnerabilities are supported:**
 - Unchecked Call Return Value (SWC-104)
 - Unprotected SELFDESTRUCT Instruction (SWC-106)

---

<a name="prerequisites"></a>
## ⚙️ Prerequisites

Before starting, you need [Node.js](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/) and [Git](https://git-scm.com/) installed and configured.

```bash
# Clone this repository
$ git clone https://github.com/rafaelfl/detector-contract

# Enter in the project folder in terminal/cmd
$ cd detector-contract
```

**It's important to have [Slither](https://github.com/crytic/slither) and [Mythril](https://github.com/ConsenSys/mythril) tools installed in your system!** Please, follow the installation instructions from both sites and make sure the tools are available in the shell's PATH.

## 🚀 Installation

After installing the tools and the source code, you can install the dependencies and run the project.

```bash
# Install dependencies
$ yarn install
```

The main (public) configurations are available in the `.env` file. Using that file one can customize the default port number and the debug mode (i.e., it should print debugging messages or not).

```
DEBUG=true
PORT=3000
```

To use the suggestion API, another (private) configuration file, you should create a `.env.local` with the environment variable `OPENAI_API_KEY`, containing the api key obtained from OpenAI API web interface. The `.env.local` file is included in the `.gitignore`, so it won't be stored in the repository.

```
OPENAI_API_KEY="YOUR API KEY"
```

After configuring the environment variables and the dependencies, you can run the service.

```bash
# Run the project using the following syntax
$ yarn start
```

The application will be available on `http://localhost:3000`.

Some other interesting commands:

- `yarn clean` - clean the build files
- `yarn dev` - run the service in watch mode (with `nodemon`)
- `yarn build` - build the page for deploying
- `yarn lint` - run the linter to identify some problems in code
- `yarn lint:fix` - run the linter to identify and fix problems in code
- `yarn prettier` - run the prettier formatter

Furthermore, the Husky is configured to verify commit messages incompatible with the "Conventional Commits" standard, as well as to run the linter and prettier in the code.

---

## 🎉 How to use

After having the service running, you can access it through the following endpoints (Swagger pending):

Endpoints:
- POST `http://localhost:3000/api/v1/scan`
  - Body: `{ sourceCode: "smart contract source code" }`

- POST `http://localhost:3000/api/v1/suggestion`
  - Body: `{ sourceCode: "smart contract source code" }`


Some examples of API calls can be imported to [Postman](https://www.postman.com/) and are available [here](https://github.com/rafaelfl/detector-contract/blob/main/resources/POC%20Scanner.postman_collection.json).

Examples using `curl`:

- Scan `killbilly.sol`:
```
curl --location 'http://localhost:3000/api/v1/scan' \
--header 'Content-Type: application/json' \
--data '{
    "sourceCode": "// SPDX-License-Identifier: MIT\npragma solidity >=0.8.18;\n\ncontract KillBilly {\n\tbool public is_killable;\n\tmapping (address => bool) public approved_killers;\n\n\tconstructor() public {\n\t\tis_killable = false;\n\t}\n\n\tfunction killerize(address addr) public {\n\t\tapproved_killers[addr] = true;\n\t}\n\n\tfunction activatekillability() public {\n\t\trequire(approved_killers[msg.sender] == true);\n\t\tis_killable = true;\n\t}\n\n\tfunction commencekilling() public {\n\t    require(is_killable);\n\n        // cast address to payable\n        address payable addr = payable(msg.sender);\n\n\t \tselfdestruct(addr);\n\t}\n}"
}'
```

- Scan `returnvalue.sol`:
```
curl --location 'http://localhost:3000/api/v1/scan' \
--header 'Content-Type: application/json' \
--data '{
    "sourceCode": "// SPDX-License-Identifier: MIT\npragma solidity >=0.8.18;\n\ncontract ReturnValue {\n    address public callee = 0xE0f7e56E62b4267062172495D7506087205A4229;\n\n    function callnotchecked() public {\n        callee.call(\"\");\n    }\n\n    function callchecked() public {\n        (bool success, bytes memory data) = callee.call(\"\");\n        require(success);\n    }\n}\n"
}'
```

- Suggestions `killbilly.sol`:
```
curl --location 'http://localhost:3000/api/v1/suggestion' \
--header 'Content-Type: application/json' \
--data '{
    "sourceCode": "// SPDX-License-Identifier: MIT\npragma solidity >=0.8.18;\n\ncontract KillBilly {\n\tbool public is_killable;\n\tmapping (address => bool) public approved_killers;\n\n\tconstructor() public {\n\t\tis_killable = false;\n\t}\n\n\tfunction killerize(address addr) public {\n\t\tapproved_killers[addr] = true;\n\t}\n\n\tfunction activatekillability() public {\n\t\trequire(approved_killers[msg.sender] == true);\n\t\tis_killable = true;\n\t}\n\n\tfunction commencekilling() public {\n\t    require(is_killable);\n\n        // cast address to payable\n        address payable addr = payable(msg.sender);\n\n\t \tselfdestruct(addr);\n\t}\n}"
}'
```

- Suggestions `returnvalue.sol`:
```
curl --location 'http://localhost:3000/api/v1/suggestion' \
--header 'Content-Type: application/json' \
--data '{
    "sourceCode": "// SPDX-License-Identifier: MIT\npragma solidity >=0.8.18;\n\ncontract ReturnValue {\n    address public callee = 0xE0f7e56E62b4267062172495D7506087205A4229;\n\n    function callnotchecked() public {\n        callee.call(\"\");\n    }\n\n    function callchecked() public {\n        (bool success, bytes memory data) = callee.call(\"\");\n        require(success);\n    }\n}\n"
}'
```

---

## 🛠 TODO list

- [ ] Create a docker container for running the service with zero setup
- [ ] Unit tests
- [ ] Document the API with Swagger
- [ ] Customize plugins source code to allow in-memory operations, avoiding the service to save the files before processing it

---

## 👨‍💻 Author

<a href="https://github.com/rafaelfl/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/31193433?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Rafael Fernandes Lopes</b></sub></a>


Developed with 💜 by Rafael Fernandes Lopes

[![Linkedin Badge](https://img.shields.io/badge/-Rafael%20Fernandes%20Lopes-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/rafael-fernandes-lopes/)](https://www.linkedin.com/in/rafael-fernandes-lopes/)
