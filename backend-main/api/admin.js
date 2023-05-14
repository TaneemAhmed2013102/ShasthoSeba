const express = require('express'); // module
const router = express.Router(); // module
const utils = require('../helpers/utils');
const { connection } = require('../db');

router.post('/hospitals/new', async (req, res) => {
    let con = connection();
    let hospitalName = req.body.hospitalName;
    let locationName = req.body.locationName;

    try {

        let query = "CREATE TABLE IF NOT EXISTS hospitals (title VARCHAR(255), location VARCHAR(255), token VARCHAR(255), slug VARCHAR(255))"
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }
            
            console.log("Hospital Table Created");
        });

        query = `SELECT * FROM hospitals WHERE title='${hospitalName}'`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 0) {
                let token = utils.makeToken('Hospital');
                let slug = utils.makeSlug(hospitalName);
                query = `INSERT INTO hospitals (title,location, token, slug) VALUES ('${hospitalName}','${locationName}', '${token}', '${slug}')`
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }

                    res.send({
                        'data': {
                            'code': 'INSERTION_SUCCESSFUL',
                            'details': 'Hospital Added',
                        },
                        'error': {}
                    });
                });
            } else {
                res.send({
                    'data': {},
                    'error': {
                        'errorCode': 'Hospital ALREADY EXISTS',
                        'errorDetails': "The given hospital already exists",
                    }
                });
            }
        });
    } catch (error) {
        res.send({
            'data': {},
            'error': {
                'errorCode': 'Query failed at try catch',
                'errorDetails': error,
            }
        });
    }
})

router.post('/tests/new', async (req, res) => {
    let con = connection();
    let testName = req.body.testName;

    try {

        let query = "CREATE TABLE IF NOT EXISTS tests (title VARCHAR(255), token VARCHAR(255), slug VARCHAR(255))"
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Test Table Created");
        });

        console.log(testName);
        let token = utils.makeToken('Test');
        let slug = utils.makeSlug(testName);
        console.log(slug);
        console.log(token);
        
        query = `INSERT INTO tests (title, token, slug) VALUES ('${testName}', '${token}', '${slug}')`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'INSERTION_SUCCESSFUL',
                    'details': 'Test Added',
                },
                'error': {}
            })
        });
    } catch (error) { 
        res.send({
            'data': {},
            'error': {
                'errorCode': 'Query failed at try catch',
                'errorDetails': error,
            }
        });
    }
})


router.post('/doctors/new', async (req, res) => {
    let con = connection();
    let doctorName = req.body.doctorName;

    try {

        let query = "CREATE TABLE IF NOT EXISTS doctors (title VARCHAR(255), token VARCHAR(255), slug VARCHAR(255))"
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Doctors Table Created");
        });

        console.log(doctorName);
        let token = utils.makeToken('Doctor');
        let slug = utils.makeSlug(doctorName);
        console.log(slug);
        console.log(token);
        
        query = `INSERT INTO doctors (title, token, slug) VALUES ('${doctorName}', '${token}', '${slug}')`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'INSERTION_SUCCESSFUL',
                    'details': 'Doctor Added',
                },
                'error': {}
            })
        });
    } catch (error) { 
        res.send({
            'data': {},
            'error': {
                'errorCode': 'Query failed at try catch',
                'errorDetails': error,
            }
        });
    }
})

router.post('/departments/new', async (req, res) => {
    let con = connection();
    let departmentName = req.body.departmentName;

    try {

        let query = "CREATE TABLE IF NOT EXISTS departments (title VARCHAR(255), token VARCHAR(255), slug VARCHAR(255))"
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Departments Table Created");
        });

        console.log(departmentName);
        let token = utils.makeToken('Department');
        let slug = utils.makeSlug(departmentName);
        console.log(slug);
        console.log(token);
        
        query = `INSERT INTO departments (title, token, slug) VALUES ('${departmentName}', '${token}', '${slug}')`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'INSERTION_SUCCESSFUL',
                    'details': 'Department Added',
                },
                'error': {}
            })
        });
    } catch (error) { 
        res.send({
            'data': {},
            'error': {
                'errorCode': 'Query failed at try catch',
                'errorDetails': error,
            }
        });
    }
})


module.exports = router;