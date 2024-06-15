module.exports=fuc=>(req,res,next)=>
     Promise.resolve(fuc(req,res,next)).catch(next)
