const routes = require('express').Router();

routes.get('/api', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

routes.use('/api/users', require('./users'));
routes.use('/api/projects', require('./projects'));
routes.use('/api/code-checks', require('./code-checks'));

module.exports = routes;