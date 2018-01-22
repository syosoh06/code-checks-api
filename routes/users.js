const router = require('express').Router();
const User = require('../models/user');


router.route('/')
    .post((req, res) => {
        const user = new User(req.body);

        user.save(err => {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });

    })

    .get((req, res) => {
        User.find((err, users) => {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

router.route('/:user_id')
    .get((req, res) => {
        User.findById(req.params.user_id, (err, user) => {
            if (err)
                res.send(err);

            res.json(user);
        })
    })

    .put((req, res) => {
        User.findById(req.params.user_id, (err, user) => {

            if (err)
                res.send(err);

            Object.assign(user, req.body);

            user.dateModified = new Date();

            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'user updated!' });
            });

        });
    })

    .delete((req, res) => {
        User.remove({
            _id: req.params.user_id
        }, function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;