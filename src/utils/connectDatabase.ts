import mongoose from 'mongoose'
require('dotenv').config()

// const connectDatabase = () => {
//   mongoose.Promise = require('bluebird')

//   mongoose
//     .connect(
//       `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
//         process.env.DB_URLDEV || process.env.DB_URL
//       }/unidental_db`
//     )
//     .then(() => {
//       console.log('Database connection created')
//     })
//     .catch((err) => {
//       console.log('Error:/n', err)
//     })
// }
// export default connectDatabase

const connectDBs = () => {
  const url_UniDentalDB_Connection = `mongodb+srv://dotrungduckspm:GfSJIhvp0cKUZoUq@cluster0.b56tbwm.mongodb.net/unidental_db`
  const url_ChatBoxDB_Connection = `mongodb+srv://${process.env.DB_USERNAME}:${
    process.env.DB_PASSWORD
  }@${process.env.DB_URLDEV || process.env.DB_URL}/chatbox_db`
  try {
    const uniDentalDB = mongoose.createConnection(url_UniDentalDB_Connection)
    const chatBoxDB = mongoose.createConnection(url_ChatBoxDB_Connection)
    console.log('connect to database successfully')
    return { uniDentalDB, chatBoxDB }
  } catch (error) {
    console.error(`Error!`)
    process.exit(1)
  }
}
export default connectDBs
