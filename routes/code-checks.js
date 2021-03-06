const router = require('express').Router();
const CodeCheck = require('../models/code-checks');


router.route('/')
    .post((req, res) => {
        const codeCheck = new CodeCheck(req.body);

        codeCheck.save(err => {
            if (err)
                res.send(err);

            res.json({ message: 'Code check created!' , codeCheck});
        });

    })

    .get((req, res) => {
        CodeCheck.find((err, codeChecks) => {
            if (err)
                res.send(err);

            res.json(codeChecks);
        });
    });

router.route('/:project_id')
    .get((req, res) => {
        console.log(req.params.project_id);
        // find each code check with a project id matching the request params project id
        const query = CodeCheck.find({ 'project._id':  req.params.project_id});

        // execute the query at a later time
        query.exec((err, codeChecks) => {
            if (err)
                res.send(err);

            res.json(codeChecks);
        });
    });

router.route('/:code_check_id')
    .get((req, res) => {
        CodeCheck.findById(req.params.code_check_id, (err, codeCheck) => {
            if (err)
                res.send(err);

            res.json(codeCheck);
        })
    })

    .put((req, res) => {
        CodeCheck.findById(req.params.code_check_id, (err, codeCheck) => {

            if (err)
                res.send(err);

            Object.assign(codeCheck, req.body);

            codeCheck.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'code check updated!' , codeCheck});
            });

        });
    })

    .delete((req, res) => {
        CodeCheck.remove({
            _id: req.params.code_check_id
        }, function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'code check successfully deleted' });
        });
    });

module.exports = router;