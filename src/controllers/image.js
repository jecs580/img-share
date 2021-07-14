const path = require('path');
const {randomName} = require('../helpers/libs');
const fs = require('fs-extra');
const {Image} = require('../models');

const ctrl  = {};

ctrl.index = async(req,res)=>{
    const id = req.params['image_id'];
    const image = await Image.findOne({filename:{$regex: id}}).lean();
    res.render('image', {image});
};
ctrl.create = (req,res)=>{
    const saveImage = async ()=>{
        const imageTempPath = req.file.path;
        const imageName = randomName();
        const images = await Image.find({filename:imageName});
        if(images.length>0){
            saveImage();
        }else{
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imageName}${ext}`);
            if(ext ==='.png'|| ext === '.jpg'|| ext==='.jpeg' || ext ==='.gif'){
                await fs.rename(imageTempPath,targetPath);
                const newImage = new Image({
                    title:req.body['title'],
                    filename:imageName + ext,
                    description:req.body['description']
                });
                const imageSaved = await newImage.save();
                // res.redirect('/images');
                res.send('works');
            }else{
                await fs.unlink(imageTempPath);
                res.status(500).json({
                    ok:false,
                    msg:'Only Images are allowed'
                })
            }
        }
       
    };
    saveImage();
};
ctrl.like = (req,res)=>{

};
ctrl.comment = (req,res)=>{

};
ctrl.remove = (req,res)=>{

};

module.exports = ctrl;