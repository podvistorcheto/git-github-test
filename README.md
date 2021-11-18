# finTech App 

#### for educational use only
#
use this code to connect to database with a /config: 

```
const mongoose = require('mongoose');

const connectMongoDB = async function(){
    try {
        const dbConnected = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected: ${dbConnected.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectMongoDB;
```