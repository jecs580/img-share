const ctrl = {};

ctrl.index = (req,res)=>{
    return res.json({
        ok:true,
        msg:'prueba'
    })
};



module.exports = ctrl;