import {mongoose} from "mongoose";

const connectDB = async () => {
    try{
        //mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true
            // useFindAndModify:true,
            // useCreateIndex:true
        })

        console.log(`mongoDB connected:${con.connection.host}`);
    } catch(error){
        console.log(error);
        process.exit(1);
    }
}

export default connectDB ;