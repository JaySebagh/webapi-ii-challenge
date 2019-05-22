const express = require('express');

const db = require('../db.js')

const router = express.Router();

// The R in CRUD
router.get('/', (req, res) => {
    db
    .find()
    .then(posts => {
            res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ success: false, message: "The post information could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    db.findById(postId)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
})

// The C in CRUD
router.post('/', (req, res) => {
    const post = req.body;
    db
    .insert(post)
    .then(posts => {
            res.status(201).json({ success: true, posts });
    })
    .catch(message => {
        res.status(500).json({ success: false, message: "There was an error while saving the post to the database"  });
    });
});

// The D in CRUD
router.delete('/:id', (req, res) => {
    const postId = req.params.id;

    db
    .remove(postId)
    .then(deleted => {
        if(posts) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(({ code, message }) => {
        res.status(code).json({ success: false, message: "The posts could not be removed" });
    });
});

// The U in CRUD
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    db
    .update(id, changes)
    .then(updated => {
            res.status(200).json({ success: true, updated });
    })
    .catch (({ code, message }) => {
        res.status(code).json({ success: false, message });
    });
});

module.exports = router;