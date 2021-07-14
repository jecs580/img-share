const ctrl = {};
const {Image} = require('../models')
ctrl.index = async (req,res)=>{
    const images = await Image.find().sort({timestamp: -1}).lean({ virtuals: true }); // ordena los datos de manera descendente
    console.log(images);
    return res.render('index',{images});
};



module.exports = ctrl;