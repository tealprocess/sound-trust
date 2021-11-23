import React from 'react';
// import styled from 'styled-components';
import Button from "./Button";

// const uploadButton = styled(Button as any);

interface IUploadsProps {
  address: string;
  arweave: any;
  arweaveKey: string;
}

const FileUploader = (props: IUploadsProps) => {
  const { address, arweave, arweaveKey } = props;
  const key = JSON.parse(arweaveKey);

  const handleFileUpload = async (file: any) => {
    try {

      const reader = new FileReader();
      reader.onload = async (event: any) => {
          const data = event.target.result;

          // create transaction
          const transaction = await arweave.createTransaction({ data }, key);
          transaction.addTag('ethAddress', address);
          transaction.addTag('soundTrust', 'true');

          // sign transaction
          await arweave.transactions.sign(transaction, key);
          const uploader = await arweave.transactions.getUploader(transaction);

          while (!uploader.isComplete) {
            await uploader.uploadChunk();
            console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
          }
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      console.error(e);
    }
  };


  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event: any) => {
    hiddenFileInput.current!.click();
  };

  // Call a function to handle the user-selected file 
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    handleFileUpload(fileUploaded);
  };

  return (
    <>
      <Button onClick={handleClick}>
        Upload a file
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        hidden
      />
    </>
  );
};

export default FileUploader;



// const STestButtonContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-wrap: wrap;
// `;

// const STestButton = styled(Button as any)`
//   border-radius: 8px;
//   font-size: ${fonts.size.medium};
//   height: 44px;
//   width: 100%;
//   max-width: 175px;
//   margin: 12px;
// `;