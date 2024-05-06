import express from 'express';
import {
    create,
    findAll,
    findAllPublished,
    findOne,
    update,
    deleteOne,
    deleteAll
} from '../controllers/postController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new Post
router.post('/', create);
// Retrieve all Posts
router.get('/', findAll);
// Retrieve all published Posts
router.get('/published', findAllPublished);
// Retrieve a single Post with id
router.get('/:id', findOne);
// Update a Post with id
router.put('/:id', update);
// Delete a Post with id
router.delete('/:id', deleteOne);
// Delete all Posts
router.delete('/', deleteAll);

export default router;