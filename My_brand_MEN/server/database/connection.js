import {mongoose} from "mongoose";
var DB_URL;

if (process.env.NODE_ENV == "production"){
    DB_URL = "mongodb+srv://theblog:testing123@cluster0.kwml0.mongodb.net/My_DB?retryWrites=true&w=majority";
}

else if (process.env.NODE_ENV == "test"){
    DB_URL = "mongodb+srv://theblog:testing123@cluster0.kwml0.mongodb.net/My_DB_Testing?retryWrites=true&w=majority";
}


const connectDB = async () => {
    try{
        //mongodb connection string
        const con = await mongoose.connect(DB_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true
            // useFindAndModify:true,
            // useCreateIndex:true
        })

        console.log(`mongoDB connected:${con.connection.host} and is running in
         the ${process.env.NODE_ENV.toLocaleUpperCase()} MODE`);
    } catch(error){
        console.log(error);
        process.exit(1);
    }
}

export default connectDB ;