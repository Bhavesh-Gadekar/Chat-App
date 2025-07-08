import mongoose from 'mongoose'

const connectdb =async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Connected To DB Succcessfully");
    } catch (error) {
        console.log(error)
    }
}

export default connectdb;