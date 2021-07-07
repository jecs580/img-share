module.exports = app =>{
      app.get('/',(req,res)=>{
          res.json({
              ok:true,
              msg:'prueba'
          })
      })
}