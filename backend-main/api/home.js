const express = require('express'); // module
const router = express.Router(); // module
const utils = require('../helpers/utils');
const { connection } = require('../db');
const fs = require("fs");
const path = require('path');
const ba64 = require("ba64");

router.get('/hospitals', async (req, res) => {
    let con = connection();

    try {
        let query = `SELECT * FROM hospitals`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': {
                        'items': result,
                        'itemsCount': result.length,
                    },
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
});

router.get('/hospitals/popular', async (req, res) => {
    let con = connection();

    try {
        let query = `SELECT * FROM hospitals ORDER BY RAND() LIMIT 4`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': {
                        'items': result,
                        'itemsCount': result.length,
                    },
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
});


router.get('/tests/popular', async (req, res) => {
    let con = connection();

    try {
        let query = `SELECT * FROM tests ORDER BY RAND() LIMIT 4`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': {
                        'items': result,
                        'itemsCount': result.length,
                    },
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
});


router.get('/doctors', async (req, res) => {
    let con = connection();

    try {
        let query = `SELECT * FROM doctors`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': {
                        'items': result,
                        'itemsCount': result.length,
                    },
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
});


router.get('/departments', async (req, res) => {
    let con = connection();

    try {
        let query = `SELECT * FROM departments`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': {
                        'items': result,
                        'itemsCount': result.length,
                    },
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
});


router.post('/appointments_list', async (req, res) => {
    let con = connection();
    let department = req.body.department;
    let doctor = req.body.doctor;

    try {
        let query = "CREATE TABLE IF NOT EXISTS appointments (token VARCHAR(255), name VARCHAR(255), age INT(255), email VARCHAR(255), address VARCHAR(255), description VARCHAR(255), image VARCHAR(255), nid INT(255), isMale BOOL, isFemale BOOL, phoneNumber VARCHAR(255), doctorSlug VARCHAR(255), departmentSlug VARCHAR(255), createdBy VARCHAR (255), treated VARCHAR(255), createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Appointments Table Accessed");
        });


        let doctorQuery = '';
        let departmentQuery = '';

        if (doctor !== "all") {
            doctorQuery=` AND doctorSlug='${doctor}'`
        }

        if (department !== "all") {
            departmentQuery=` AND departmentSlug='${department}'`
        }

        let token = utils.makeToken("Appointments"); 
        query = `SELECT * FROM appointments WHERE treated='No'${doctorQuery}${departmentQuery} ORDER BY createdAt DESC`;

        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': {
                        'items': result,
                        'itemsCount': result.length,
                    },
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
});

module.exports = router;