import  {client} from './client.js'

async function init(){
    //  const data=await client.expire('total_crashes', 5);
    const setResult = await client.set('bike:3', 'Yamaha');
    const getBike = await client.get('bike:3');
    const incrBy = await client.incrby('total_crashes', 5);
    const getTotal = await client.get('total_crashes');
    // const flushResult = await client.flushdb('total_crashes');

    const result = {setResult, getBike, incrBy, getTotal};
    console.log(  "Result--->",result);
}
init()