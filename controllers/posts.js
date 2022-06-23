import express from 'express';
//import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

// All our handlers for our routes.
// this is for our GET post.
const router = express.Router();
//http://localhost:5000/posts
export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
                //https://www.restapitutorial.com/httpstatuscodes.html
    try {
        await newPost.save();

        res.stutus(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });//({message: error.message));
    }
}

