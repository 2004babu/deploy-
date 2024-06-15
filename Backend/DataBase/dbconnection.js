const mongoose=require('mongoose')
const dotenv=require('dotenv')
const path=require('path')
dotenv.config({path:path.join(__dirname,'Config','config.env')});
console.log(typeof(process.env.MONGODB_URI));

const GetDataBase=async()=>{
    try {
        const dbUri =process.env.MONGODB_URI;
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,  
          });
        console.log(`Database Connected host : ${dbUri.substring(0,40)}` );
      } catch (error) {
        console.log('Database not Connected...!!');
        console.error(error);
      }
}

module.exports=GetDataBase;