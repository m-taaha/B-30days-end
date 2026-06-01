import {createClient} from 'redis'


const client = createClient()

try {
    await client.connect();
    console.log("Redis conected Successfully")


    
} catch(error) {
    console.log(error)
    console.log("Redis conection failed");
};





    export default client;