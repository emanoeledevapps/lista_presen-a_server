import { create } from "ipfs-http-client";

const projectId = '2F2FHYWhdz3ynk8PeorZrtf0FSG';
const projectSecret = '9cf6a1ddc8510764d564c0f7b9a08cf2';

const options = {
    host: 'ipfs.infura.io',
    port: 5001,
    method: 'POST',
    auth: projectId + ':' + projectSecret,
};

export function IpfsClient(){
    const ipfsClient = create(options);
    return ipfsClient;
}