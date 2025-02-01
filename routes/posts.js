const express = require('express')
const Posts = require('../models/posts')
const router  = express.Router()

//save posts
router.post('/post/save',(req,res)=>{
    let newPosts = new Posts(req.body)

    newPosts.save((err) =>{
        if(err){
            return res.status(400).json({
                eroor:err
            })
        }return res.status(200).json({
            success:"Posts saved successfully"
        })
    })
})

module.exports = router