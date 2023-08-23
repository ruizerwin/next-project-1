import mongoose, { connection } from "mongoose";

/*export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.log(
                "MongoDB connection error. Please make sure MongoDB is running. " +
                    err
            );
            process.exit();
        });
    } catch (error) {
        console.log("Something goes wrong!");
        console.log(error);
    }
}*/

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);

        if(connection.readyState === 1) {
            return Promise.resolve(true);
        }

        console.log("MongoDB connected successfully");
    } catch (error) {
        return Promise.reject(error);
        console.log("Something goes wrong!");
        console.log(error);
    }
}