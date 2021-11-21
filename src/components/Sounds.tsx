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

// Set up audio context
// window.AudioContext = window.AudioContext || window.webkitAudioContext; // This might be needed for safari
const audioContext = new AudioContext();

const Sounds = (props: ISoundsProps) => {
  const [soundSrcs, setSrcs] = useState(['']);
  // const [waveformData, setWaveformData] = useState(['']);

  // const { address } = props;
  // const blockweave = new Blockweave();
  const yatusWallet = 'Z4yR345EQXPPGEipQ-nEcOyBnTIL0x6V2Z7-eIM0pWM';

  // Starting point to create our waveform data
  const createWaveformData = (url: string) => {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => visualize(audioBuffer));
  }

  // Tieing together all the functions to visualize the waveform
  const visualize = (audioBuff: AudioBuffer) => {
    const filteredData = filterData(audioBuff);
    const normalizedData = normalizeData(filteredData);
    console.log(normalizedData);
  };

  // Run through one channel of an audio buffer to get a sample size of data
  const filterData = (audioBuffer: AudioBuffer) => {
    const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
    const samples = 70; // Number of samples we want to have in our final data set
    const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      const blockStart = blockSize * i; // the location of the first sample in the block
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum = sum + Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
      }
      filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
    }
    return filteredData;
  }

  // This guarantees that the largest data point will be set to 1, and the rest of the data will scale proportionally.
  const normalizeData = (filteredData: number[]) => {
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map(n => n * multiplier);
  }





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
          const url = `https://arweave.net/${txnId}`;
          soundSrcs.push(url);
          createWaveformData(url);
        });

        setSrcs(soundSrcs);

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
