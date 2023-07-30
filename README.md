# @wharfkit/example-nodejs

A simple script for nodejs that performs a token transfer using [@wharfkit/session](https://github.com/wharfkit/session) and [@wharfkit/wallet-plugin-privatekey](https://github.com/wharfkit/wallet-plugin-privatekey).

## nodejs and fetch

The script requires nodejs v18+ in order to run due to its dependency on fetch. If running an older version of nodejs, an instance of fetch needs to be provided, which can be done by running:

```bash
yarn add node-fetch@2.6.1
```

Then include `node-fetch` at the top of the index.js file:

```js
const fetch = require('node-fetch')
```

And pass fetch in to the 2nd parameter of the `Session` constructor.

```js
// Establish the session with all of the above parameters
const session = new Session(
    {
        actor: accountName,
        permission: permissionName,
        chain,
        walletPlugin: new WalletPluginPrivateKey(privateKey),
    },
    // The fetch function to use for API calls
    {
        fetch,
    }
)
```
