import express from 'express';
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
const router = express.Router();

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find()
        console.log(postMessage)
        res.status(200).json(postMessage)
    }
    catch (err) {
       res.status(404).json({message: err.message})
    }
}

export const createPosts = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage(post)
    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}
export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(_id))  return res.status(404).send('No post with that id')
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))  return res.status(404).send('No post with that id')
     await PostMessage.findByIdAndRemove(id)
    //  console.log('deleted', PostMessage.findByIdAndRemove(id), 'and after')
    res.json({message: 'Post deleted successfully'})
}
export const likePost = async (req, res) => {
    const {id} = req.params;
    console.log(req.params, id, 'in controller')
    if(!mongoose.Types.ObjectId.isValid(id))  return res.status(404).send('No post with that id')
    console.log(PostMessage, 'in line 46')
     const post = PostMessage.findById(id)
     console.log('before schema', post.schema, 'after schema')
    //  console.log(post, 'in line 47') 
    //  console.log(typeof post.likeCount, 'in line 49')
     const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true})
     console.log(updatedPost, 'updated post is here')
     res.json(updatedPost) 
} 

export default router; 