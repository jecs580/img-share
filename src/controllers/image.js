const path = require('path');
const {randomName} = require('../helpers/libs');
const fs = require('fs-extra');
const {Image,Comment} = require('../models');
const md5 = require('md5');
const ctrl  = {};

ctrl.index = async(req,res)=>{
    const id = req.params['image_id'];
    const image2 = await Image.findOne({filename:{$regex: id}});
   if(image2){
        image2.views = image2.views+1;
        await image2.save();
        console.log(image2);
        const image = await Image.findOne({filename:{$regex: id}}).lean(({ virtuals: true }));
        const comments = await Comment.find({image_id: image._id}).lean(({ virtuals: true }));
        res.render('image', {image, comments});
   }else{
       res.redirect('/');
   }
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
                res.redirect('/images/'+imageName);
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
ctrl.like = async (req,res)=>{
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image){
        image.likes =  image.likes+1;
        await image.save();
        res.json({
            likes:image.likes
        });
    }else{
        res.status(500).json({
            ok:false,
            msg:'Error interno'
        })
    }
};
ctrl.comment = async (req,res)=>{
    const image = await Image.findOne({filename:{$regex: req.params.image_id}});
    if(image){
        const newComment = new Comment(req.body);
        newComment.gravatar =  md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/'+image.uniqueId)
    }else{
        res.redirect('/');
    }
};
ctrl.remove = (req,res)=>{

};

module.exports = ctrl;