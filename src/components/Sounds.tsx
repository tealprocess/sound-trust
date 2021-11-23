import * as React from "react";
import { useState, useEffect } from "react";
// import Blockweave from 'blockweave';
import { and, equals } from 'arql-ops';

interface ISoundsProps {
  address: string;
  arweave: any;
  arweaveKey: string;
}

const Sounds = (props: ISoundsProps) => {
  const { address, arweave, arweaveKey } = props;
  const [soundSrcs, setSrcs] = useState(['']);

  useEffect(() => {

    const getSounds = async () => {
      try {
        const yatusWallet = 'Z4yR345EQXPPGEipQ-nEcOyBnTIL0x6V2Z7-eIM0pWM';
        console.log(arweaveKey);
        // const arAddress = await arweave.wallets.jwkToAddress(arweaveKey);
        // console.log(arAddress);

        const myQuery = and(
          equals('from', yatusWallet),
          equals('soundTrust', 'true'),
          equals('ethAddress', address),
        );

        const txns = await arweave.arql(myQuery);
        txns.forEach( (txnId: any) => {
          soundSrcs.push(`https://arweave.net/${txnId}`);
          setSrcs(soundSrcs);
        });

      } catch (error) {
        console.log('error', error);
      }
    }

    getSounds();
  }, []);

  // const soundId = 0;

  // blockweave.wallets.getLastTransactionId(yatusWallet).then((transactionId) => {
  //     console.log('Last transaction: ', transactionId);
  //
  //     // Get txn info
  //     // blockweave.transactions.get(transactionId).then(txn => {
  //     //   console.log(txn)
  //     //
  //     //   let txnId = txn.id;
  //     //
  //     //   let soundType = "mp4";
  //     //   let soundSrc = `https://arweave.net/${txnId}`;
  //     //
  //     //   let audioHtml = `
  //     //     <audio
  //     //       id="sound-${soundId}"
  //     //       controls="controls"
  //     //       src="${soundSrc}"
  //     //       type="audio/${soundType}"
  //     //     ></audio>
  //     //   `;
  //     //
  //     //   // Add audio element to the page
  //     //   document.querySelector('#sounds').insertAdjacentHTML('beforeend', audioHtml);
  //     //
  //     // });
  // });

  return (
    <React.Fragment>
      <h3>My Sounds</h3>
      {/* }<div id="sounds">Yatu's Arweave Wallet: {yatusWallet}</div> */}
      {soundSrcs.map(soundSrc => {
        return (soundSrc) ? (<audio key={soundSrc} src={soundSrc} controls />) : '';
      })}
    </React.Fragment>
  );
}

export default Sounds;
