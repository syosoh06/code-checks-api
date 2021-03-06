const router = require('express').Router();
const Project = require('../models/project');

router.route('/')
    .post((req, res) => {
        const project = new Project(req.body);

        project.save(err => {
            if (err) {
                return res.send();
            }

            res.json({ message: 'Project created!' , project});
        });

    })

    .get((req, res) => {
        Project.find((err, projects) => {
            if (err)
                res.send(err);

            res.json(projects);
        });
    });

router.route('/:project_id')
    .get((req, res) => {
        Project.findById(req.params.project_id, (err, project) => {
            if (err)
                res.send(err);

            res.json(project);
        })
    })

    .put((req, res) => {
        Project.findById(req.params.project_id, (err, project) => {

            if (err)
                res.send(err);

            Object.assign(project, req.body);


            project.save(err => {
                if (err)
                    res.send(err);

                res.json({ message: 'Project updated!' , project});
            });

        });
    })

    .delete((req, res) => {
        Project.remove({
            _id: req.params.project_id
        }, err => {
            if (err)
                res.send(err);

            res.json({ message: 'Project Successfully deleted' , deletedProjectId: req.params.project_id});
        });
    });

module.exports = router;