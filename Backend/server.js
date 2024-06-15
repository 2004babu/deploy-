
const app=require('./app')
const dotenv=require('dotenv')
const path=require('path')
dotenv.config({path:path.join(__dirname,'Config','config.env')});


const GetDataBase = require('./DataBase/dbconnection')
GetDataBase()


const server=app.listen(process.env.PORT,()=>{
    console.log(`server running in : ${process.env.PORT} on ${process.env.NODE_ENV} `);
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error :${err}`);
    console.log(`Shutting Down The Server  unhandledRejection`);
    server.close(()=>{
        process.exit(1)
    });
})

process.on('uncaughtException',(err)=>{
    console.log(`Error :${err}`);
    console.log(`Shutting Down The Server  uncaughtException `);
    server.close(()=>{
        process.exit(1)
    });
})
