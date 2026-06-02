import {createClient} from "redis";

const client = createClient();


try {
    await client.connect();
    console.log("redis connection successfull")

} catch(error) {
    console.log(error);
    console.log("Redis connection failed");
}






export default client;
