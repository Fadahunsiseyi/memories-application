
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


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