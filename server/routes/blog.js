// routes/blog.js
import express from "express";
const router = express.Router();
import BlogPost from '../models/BlogPost.js';


// Create a new blog post
router.post('/', async (req, res) => {
  try {
    const blogPost = new BlogPost(req.body);
    await blogPost.save();
    res.status(201).send(blogPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).send(blogPosts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single blog post by id
router.get('/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) return res.status(404).send();
    res.status(200).send(blogPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a blog post by id
router.patch('/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blogPost) return res.status(404).send();
    res.status(200).send(blogPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a blog post by id
router.delete('/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blogPost) return res.status(404).send();
    res.status(200).send(blogPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

