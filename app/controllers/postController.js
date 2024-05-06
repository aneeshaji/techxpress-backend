import Post from '../models/postModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

//@desc     Posts
//@route    GET api/posts
//@access   Public
const create = asyncHandler(async (req, res) => {
    // Validate request
  	if (!req.body.title) {
    	res.status(400).send({ message: "Content can not be empty!" });
    	return;
  	}

	// Create a Post
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
		image: req.body.image ? req.body.image : '',
		author: req.body.author,
		author_image: req.body.author_image ? req.body.author_image : '',
		reading_time: req.body.reading_time,
		category: req.body.category,
		date: req.body.date,
		description: req.body.description,
		published: req.body.published ? req.body.published : false
	});

	// Save Post in the database
	post
		.save(post)
		.then(data => {
		res.send(data);
		})
		.catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while creating the Post."
		});
	});
});

//@desc     Get all Posts
//@route    POST api/posts
//@access   Public
const findAll = asyncHandler(async (req, res) => {
	const title = req.query.title;
  	var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

	Post.find(condition)
		.then(data => {
		res.send(data);
		})
		.catch(err => {
		res.status(500).send({
			message:
			err.message || "Some error occurred while retrieving posts."
		});
	});
});

//@desc     Published Posts
//@route    GET api/posts/published
//@access   Public
const findAllPublished = asyncHandler(async (req, res) => {
	Post.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
});

//@desc     Get Post With ID
//@route    GET api/posts/:id
//@access   Public
const findOne = asyncHandler(async (req, res) => {
	const id = req.params.id;
	Post.findById(id)
	  .then(data => {
		if (!data)
		  res.status(404).send({ message: "Not found Post with id " + id });
		else res.send(data);
	})
	.catch(err => {
		res
		.status(500)
		.send({ message: "Error retrieving Post with id=" + id });
	});
});

//@desc     Update Post
//@route    PUT api/posts/:id
//@access   Public
const update = asyncHandler(async (req, res) => {
	if (!req.body) {
		return res.status(400).send({
		  message: "Data to update can not be empty!"
		});
	}
	
	const id = req.params.id;
	
	Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then(data => {
		  if (!data) {
			res.status(404).send({
			  message: `Cannot update Post with id=${id}. Maybe Post was not found!`
			});
		  } else res.send({ message: "Post was updated successfully." });
		})
		.catch(err => {
		  res.status(500).send({
			message: "Error updating Post with id=" + id,
			error: err
		});
	});
});

//@desc     Delete Post With ID
//@route    DELETE api/posts/:id
//@access   Public
const deleteOne = asyncHandler(async (req, res) => {
	const id = req.params.id;

	Post.findByIdAndRemove(id, { useFindAndModify: false })
	  .then(data => {
		if (!data) {
		  res.status(404).send({
			message: `Cannot delete Post with id=${id}. Maybe Tutorial was not found!`
		  });
		} else {
		  res.send({
			message: "Post was deleted successfully!"
		  });
		}
	})
	  .catch(err => {
		res.status(500).send({
		  message: "Could not delete Post with id=" + id
		});
	});
});

//@desc     Delete All Posts
//@route    DELETE api/posts/
//@access   Public
const deleteAll = asyncHandler(async (req, res) => {
	Post.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Posts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all posts."
      });
    });
});

export { create, findAll, findAllPublished, findOne, update, deleteOne, deleteAll };
