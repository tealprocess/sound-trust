import * as React from "react";
import { useState, useEffect } from "react";
// import Blockweave from 'blockweave';
import { and, equals } from 'arql-ops';
import Arweave from 'arweave';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

interface ISoundsProps {
  address: string;
}

const Sounds = (props: ISoundsProps) => {
  const [soundSrcs, setSrcs] = useState(['']);

  // const { address } = props;
  // const blockweave = new Blockweave();
  const yatusWallet = 'Z4yR345EQXPPGEipQ-nEcOyBnTIL0x6V2Z7-eIM0pWM';

  // const soundType = "mp4";
  // const txnId = 'cX9tBmnHloLB7X6gMcIE5u07oJ-RcVOKkjBv7V38QF0';
  // const soundSrc = `https://arweave.net/${txnId}`;

  useEffect(() => {
    const getTxns = async () => {
      try {
        const myQuery = and(
          equals('from', yatusWallet),
          equals('soundTrust', 'true'),
        );

        const txns = await arweave.arql(myQuery);
        console.log(txns);
        txns.forEach(txnId => {
          soundSrcs.push(`https://arweave.net/${txnId}`);
          setSrcs(soundSrcs);
        });

      } catch (error) {
        console.log('error', error);
      }
    }

    getTxns();
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
      <h3>Sounds</h3>
      {/* }<div id="sounds">Yatu's Arweave Wallet: {yatusWallet}</div> */}
      {soundSrcs.map(soundSrc => {
        console.log(soundSrc);
        return (soundSrc) ? (<audio key={soundSrc} src={soundSrc} controls />) : '';
      })}
    </React.Fragment>
  );
}

export default Sounds;
