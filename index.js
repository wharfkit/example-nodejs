// Include the Session and WalletPluginPrivateKey classes
const {Session} = require('@wharfkit/session')
const {WalletPluginPrivateKey} = require('@wharfkit/wallet-plugin-privatekey')

// The blockchain to connect to (in ChainDefinition format)
const chain = {
    id: '73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d',
    url: 'https://jungle4.greymass.com',
}

// The account and permission to use in the session
const accountName = 'wharfkit1111'
const permissionName = 'test'

// The private key for the permission on the account
const privateKey = '5Jtoxgny5tT7NiNFp1MLogviuPJ9NniWjnU4wKzaX4t7pL4kJ8s'

// A wallet plugin instance that will sign transactions with the private key
const walletPlugin = new WalletPluginPrivateKey(privateKey)

// Establish the session with all of the above parameters
const session = new Session({
    actor: accountName,
    permission: permissionName,
    chain,
    walletPlugin,
})

// The action to send, a small token transfer in this example
const transferAction = {
    // The account name of the contract
    account: 'eosio.token',
    // The name of the action to perform
    name: 'transfer',
    // Which account authorizes this transaction, which we can pass in from the session
    authorization: [session.permissionLevel],
    // The data to send to the contract, in this case the token transfer parameters
    data: {
        // Who the tokens are from, which we can pass in from the session
        from: session.actor,
        // Who the tokens are to
        to: 'wharfkittest',
        // The quantity of tokens to send
        quantity: '0.0001 EOS',
        // An optional memo to send with the token transfer
        memo: 'Hello World!',
    },
}

// Create an async main process that will run
async function main() {
    // Perform the transaction and await result
    const result = await session.transact({action: transferAction})

    // Log the result
    console.log(`Transaction was successfully broadcast!`)
    console.log(
        `Explorer Link: https://jungle4.eosq.eosnation.io/tx/${result.response.transaction_id}`
    )
}

// Run the main process
main()
