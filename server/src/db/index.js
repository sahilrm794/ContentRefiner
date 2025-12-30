import mongoose, { modelNames } from "mongoose"
import { DB_NAME } from "../constants.js"
import { automate } from "../phase-2-automation/index.js"
import scrapeBeyondChats from "../scraper/scrapeBeyondChat.js"

const connectDB = async()=>{
    try {
        const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB Host:${connectioninstance.connection.host}`)
        // scrapeBeyondChats();
        // automate();

    } catch (error) {
        console.log("Mongodb error",error);
        process.exit(1);
    }
}

export default connectDB;