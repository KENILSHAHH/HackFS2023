/** @format */

import React from 'react';
import { create } from 'ipfs-http-client';
import { useState } from 'react';
const projectId = '2MCR81xh4vPrqI0y4SQtv09NTnb';
const projectSecret = '1db9edb0249dd358814ccfd8f9dfc26d';
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  },
});
function UploadToIpfs() {
    const[fileUrl, setFileUrl] = useState("")
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://polybase.infura-ipfs.io/ipfs/${added.path}`;
     setFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }
  return (
    <div className="App">
      <h1>IPFS Example</h1>

      <input
        type="file"
        onChange={onChange}
      />
      {fileUrl && (
        <img
          src={fileUrl}
          width="600px"
        />
      )}
      <p>{fileUrl}</p>
    </div>
  );
}

export default UploadToIpfs;
