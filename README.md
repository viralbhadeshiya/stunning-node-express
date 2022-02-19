# stunning-node-express
Best optimize way to create node app with express server

## Installation & Configuration

- clone the repository into your local machine after cloning the project do follow these steps

1. Install dependencies via npm:

```bash
npm i # (for local setup)
```

2. Create .env file identical to example.env with valid values
3. Create `jwtPrivate.key` & `jwtPublic.key` files in auth_keys directory at root of the project. Generate RSA key pair of 512 or 1024 bit and save it in the respective file. ( you can use some online generators like [this](http://travistidwell.com/jsencrypt/demo/) or use ssh-keygen command )
4. To start the server

```bash
npm start
```

