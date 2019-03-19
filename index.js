// implement your API here]
// import express 
const express = require('express');

const db = require('./data/db.js')

const server = express(); // creates new http server

// middleware
server.use(express.json());

// The R in CRUD
server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
            res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ success: false, message: "The post information could not be retrieved." })
    })
})

server.get('/api/posts/:id', (req, res) => {
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
server.post('/api/posts', (req, res) => {
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
server.delete('/api/posts/:id', (req, res) => {
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
server.put('/api/posts/:id', (req, res) => {
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

server.listen(4000, () => {
    console.log('\n*** Running on port 4k ***\n')
})