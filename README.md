# OZ-APP-1

## Project setup
```
npm install
```

### Pre-requirements
Blockchain wallet in browser [e.g Metamask](https://metamask.io/).
Local Blockchain for develop [Ganache](https://www.trufflesuite.com/ganache)
To deploy to other blockchain networks you will need an infura account to connect
[Infura](https://infura.io/) register and create a project
Create a .secrets.json (see ./secrets.dist.json)

### Compiles OpenZeppelin Contracts
```
npx oz compile
```

### Deploy a OpenZeppelin contract
```
npx oz deploy
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
