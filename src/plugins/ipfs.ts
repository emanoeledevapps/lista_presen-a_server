
import * as IPFS from 'ipfs-core'
const projectId = '2F2FHYWhdz3ynk8PeorZrtf0FSG';
const projectSecret = '9cf6a1ddc8510764d564c0f7b9a08cf2';

const options = {
    host: 'ipfs.infura.io',
    port: 5001,
    method: 'POST',
    auth: projectId + ':' + projectSecret,
};


export async function teste(){
    const ipfs = await IPFS.create()
    const { cid } = await ipfs.add('Hello world')
    console.info(cid)
}

