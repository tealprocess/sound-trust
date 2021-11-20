// const Arweave = require('arweave');
// const fs = require('fs');
//
// // // If you want to connect directly to a node
// // const arweave = Arweave.init({
// //     host: '127.0.0.1',
// //     port: 1984,
// //     protocol: 'http'
// // });
//
// // Or to specify a gateway when running from NodeJS you might use
// const arweave = Arweave.init({
//   host: 'arweave.net',
//   port: 443,
//   protocol: 'https'
// });
//
// async function start() {
// 	try {
//     let pathToSound = '/Users/mattohagan/web3/sound-trust/sounds-to-deploy/its\ flooding\ outside.m4a';
// 		let data = fs.readFileSync(pathToSound);
// 		let key = JSON.parse(fs.readFileSync('./arweave-key-Z4yR345EQXPPGEipQ-nEcOyBnTIL0x6V2Z7-eIM0pWM.json'));
// 		// console.log(key);
//
// 		let address = await arweave.wallets.jwkToAddress(key);
// 		let balance = await arweave.wallets.getBalance(address);
// 		console.log(balance);
//
// 		// create transaction
// 		let transaction = await arweave.createTransaction({ data: data }, key);
// 		transaction.addTag('something', 'something');
// 		// console.log(transaction);
// 		console.log(balance);
//
// 		// // sign transaction
// 		await arweave.transactions.sign(transaction, key);
// 		console.log(balance);
//
// 		// let uploader = await arweave.transactions.getUploader(transaction);
//
// 		// while (!uploader.isComplete) {
// 		// 	await uploader.uploadChunk();
// 		// 	console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
// 		// }
// 	} catch(e) {
// 		console.error(e);
// 	}
// }
//
// start();
