const express = require('express'); // module
const router = express.Router(); // module
const { sendEmail } = require('../helpers/emailSender');
const bcrypt = require('bcrypt');
const utils = require('../helpers/utils');
const { connection } = require('../db');
const salt = 10;

router.post('/login', async (req, res) => {
    let con = connection();
    let email = req.body.email;
    let password = req.body.password;

    try {

        let query = "CREATE TABLE IF NOT EXISTS users (hospitalname VARCHAR(255), userToken VARCHAR(255),location VARCHAR(255), email VARCHAR(255), password VARCHAR(255), verified VARCHAR(255), type VARCHAR(255))";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("User Table Created");
        });

        query = `SELECT * FROM users WHERE email = '${email}'`;
        con.query(query, async (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 1) {
                result = result[0];
                
                if (result.verified === "Yes") {
                    let match = await bcrypt.compare(password, result.password);
                    let userSessionToken = utils.makeToken('UserSession');

                    query = `CREATE TABLE IF NOT EXISTS userSessionToken (userToken VARCHAR(255), userSessionToken VARCHAR(255))`;

                    con.query(query, (err, result) => {
                        if (err) {
                            throw err;
                        }
                    });

                    query = `INSERT INTO userSessionToken (userToken, userSessionToken) VALUES ('${result.userToken}', '${userSessionToken}')`;

                    con.query(query, (err, result) => {
                        if (err) {
                            throw err;
                        }
                    });
                    
                    if (match) {
                        res.send({
                            'data': {
                                'userToken': result.userToken,
                                'userSessionToken': userSessionToken,
                            },
                            'error': {}
                        })
                    } else {
                        res.send({
                            'data': {},
                            'error': {
                                'errorCode': "Invalid Password",
                                'errorDetails': "The password did not match"
                            }
                        });
                    }
                } else {
                    res.send({
                        'data': {},
                        'error': {
                            'errorCode': "Email Unverified",
                            'errorDetails': "Please verify your email"
                        }
                    });
                }
            } else {
                res.send({
                    'data': {},
                    'error': {
                        'errorCode': "Invalid Email",
                        'errorDetails': "There is no user with this email"
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
});

router.post('/register', async (req, res) => {
    let con = connection();
    let hospitalname = req.body.hospitalname;
    let location = req.body.location;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password, salt);

    try {
        let query = "CREATE TABLE IF NOT EXISTS users (hospitalname VARCHAR(255), userToken VARCHAR(255),location VARCHAR(255), email VARCHAR(255), password VARCHAR(255), verified VARCHAR(255), type VARCHAR(255))"
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("User Table Created");
        });

        query = `SELECT * FROM users WHERE email = '${email}'`;
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 1) {
                res.send({
                    'data': {},
                    'error': {
                        'errorCode': 'Email Already Used',
                        'errorDetails': 'The email is already used'
                    }
                });
            } else {
                let userToken = utils.makeToken("USER");
                query = `INSERT INTO users (hospitalname, userToken, location, email, password, verified, type) VALUES ('${hospitalname}', '${userToken}','${location}', '${email}', '${password}', 'No', 'User')`
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }
                });

                query = "CREATE TABLE IF NOT EXISTS usersVerification (userToken VARCHAR(255), emailVerificationToken VARCHAR(255), status VARCHAR(255))"
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }

                    console.log("User Verification Table Created");
                });

                let emailVerificationToken = utils.makeToken("VerifyEmail");
                query = `INSERT INTO usersVerification (userToken, emailVerificationToken, status) VALUES ('${userToken}', '${emailVerificationToken}', 'Not Verified')`
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }
                });
                sendEmail(email, emailVerificationToken);

                res.send({
                    'data': {
                        'code': 'INSERTION_SUCCESSFUL',
                        'details': 'Verification Email Sent'
                    },
                    'error': {} 
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
});

router.get('/verifyEmail/:emailVerificationToken', async (req, res) => {
    let con = connection();
    let emailVerificationToken = req.params.emailVerificationToken;

    // console.log(emailVerificationToken);
    try {
        let query = `SELECT * FROM usersVerification WHERE emailVerificationToken = '${emailVerificationToken}'`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 1) {
                result = result[0];

                query = `UPDATE users SET verified = 'Yes' WHERE userToken = '${result.userToken}'`;
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }
                });

                query = `UPDATE patientusers SET verified = 'Yes' WHERE userToken = '${result.userToken}'`;
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }
                });

                query = `UPDATE doctorusers SET verified = 'Yes' WHERE userToken = '${result.userToken}'`;
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }
                });

                query = `UPDATE usersVerification SET status = 'Verified' WHERE emailVerificationToken = '${emailVerificationToken}'`;
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }
                });
            }
        });

        res.send({ 
            'data': {
                'code': 'LIST_LOADED',
                'details': 'Email Verified',
            },
            'error': {}
        })
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

router.post('/patient/login', async (req, res) => {
    let con = connection();
    let email = req.body.email;
    let password = req.body.password;

    try {

        let query = "CREATE TABLE IF NOT EXISTS patientusers (fullname VARCHAR(255), fathersname VARCHAR(255), mothersname VARCHAR(255), dateofbirth VARCHAR(255), phonenumber int(11), address VARCHAR(255), nid int(100), age int(10), weight int(100), height int(100), bloodgroup VARCHAR(10), userToken VARCHAR(255), email VARCHAR(255), password VARCHAR(255), verified VARCHAR(255), type VARCHAR(255))";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Register Table Created");
        });

        query = `SELECT * FROM patientusers WHERE email = '${email}'`;
        con.query(query, async (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 1) {
                result = result[0];
                
                if (result.verified === "Yes") {
                    let match = await bcrypt.compare(password, result.password);
                    let userSessionToken = utils.makeToken('UserSession');

                    query = `CREATE TABLE IF NOT EXISTS userSessionToken (userToken VARCHAR(255), userSessionToken VARCHAR(255))`;

                    con.query(query, (err, result) => {
                        if (err) {
                            throw err;
                        }
                    });

                    query = `INSERT INTO userSessionToken (userToken, userSessionToken) VALUES ('${result.userToken}', '${userSessionToken}')`;

                    con.query(query, (err, result) => {
                        if (err) {
                            throw err;
                        }
                    });
                    
                    if (match) {
                        res.send({
                            'data': {
                                'userToken': result.userToken,
                                'userSessionToken': userSessionToken,
                            },
                            'error': {}
                        })
                    } else {
                        res.send({
                            'data': {},
                            'error': {
                                'errorCode': "Invalid Password",
                                'errorDetails': "The password did not match"
                            }
                        });
                    }
                } else {
                    res.send({
                        'data': {},
                        'error': {
                            'errorCode': "Email Unverified",
                            'errorDetails': "Please verify your email"
                        }
                    });
                }
            } else {
                res.send({
                    'data': {},
                    'error': {
                        'errorCode': "Invalid Email",
                        'errorDetails': "There is no user with this email"
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
});

router.post('/patient/register', async (req, res) => {
    let con = connection();
    let fullname = req.body.fullname;
    let fathersname = req.body.fathersname;
    let mothersname = req.body.mothersname;
    let dateofbirth = req.body.dateofbirth;
    let phonenumber = req.body.phonenumber;
    let address = req.body.address;
    let nid = req.body.nid;
    let age = req.body.age;
    let weight = req.body.weight;
    let height = req.body.height;
    let bloodgroup = req.body.bloodgroup;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password, salt);

    try {
        let query = "CREATE TABLE IF NOT EXISTS patientusers (fullname VARCHAR(255), fathersname VARCHAR(255), mothersname VARCHAR(255), dateofbirth VARCHAR(255), phonenumber int(11), address VARCHAR(255), nid int(100), age int(10), weight int(100), height int(100), bloodgroup VARCHAR(10), userToken VARCHAR(255), email VARCHAR(255), password VARCHAR(255), verified VARCHAR(255), type VARCHAR(255))";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Register Table Created");
        });

        query = `SELECT * FROM patientusers WHERE email = '${email}'`;
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 1) {
                res.send({
                    'data': {},
                    'error': {
                        'errorCode': 'Email Already Used',
                        'errorDetails': 'The email is already used'
                    }
                });
            } else {
                let userToken = utils.makeToken("USER");
                query = `INSERT INTO patientusers (fullname, fathersname, mothersname, dateofbirth, phonenumber, address, nid, age, weight, height, bloodgroup, userToken, email, password, verified, type) VALUES ('${fullname}', '${fathersname}','${mothersname}', '${dateofbirth}','${phonenumber}','${address}','${nid}','${age}','${weight}','${height}','${bloodgroup}','${userToken}', '${email}', '${password}', 'No', 'User')`
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }
                });

                query = "CREATE TABLE IF NOT EXISTS usersVerification (userToken VARCHAR(255), emailVerificationToken VARCHAR(255), status VARCHAR(255))"
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }

                    console.log("User Verification Table Created");
                });

                let emailVerificationToken = utils.makeToken("VerifyEmail");
                query = `INSERT INTO usersVerification (userToken, emailVerificationToken, status) VALUES ('${userToken}', '${emailVerificationToken}', 'Not Verified')`
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }
                });
                sendEmail(email, emailVerificationToken);

                res.send({
                    'data': {
                        'code': 'INSERTION_SUCCESSFUL',
                        'details': 'Verification Email Sent'
                    },
                    'error': {}
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
});

router.post('/doctor/login', async (req, res) => {
    let con = connection();
    let email = req.body.email;
    let password = req.body.password;

    try {

        let query = "CREATE TABLE IF NOT EXISTS doctorusers (doctorsname VARCHAR(255),degree VARCHAR(255),department VARCHAR(255),hospital VARCHAR(255), email VARCHAR(255), userToken VARCHAR(255), password VARCHAR(255), verified VARCHAR(255), type VARCHAR(255))";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("User Table Created");
        });

        query = `SELECT * FROM doctorusers WHERE email = '${email}'`;
        con.query(query, async (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 1) {
                result = result[0];
                
                if (result.verified === "Yes") {
                    let match = await bcrypt.compare(password, result.password);
                    let userSessionToken = utils.makeToken('UserSession');

                    query = `CREATE TABLE IF NOT EXISTS userSessionToken (userToken VARCHAR(255), userSessionToken VARCHAR(255))`;

                    con.query(query, (err, result) => {
                        if (err) {
                            throw err;
                        }
                    });

                    query = `INSERT INTO userSessionToken (userToken, userSessionToken) VALUES ('${result.userToken}', '${userSessionToken}')`;

                    con.query(query, (err, result) => {
                        if (err) {
                            throw err;
                        }
                    });
                    
                    if (match) {
                        res.send({
                            'data': {
                                'userToken': result.userToken,
                                'userSessionToken': userSessionToken,
                            },
                            'error': {}
                        })
                    } else {
                        res.send({
                            'data': {},
                            'error': {
                                'errorCode': "Invalid Password",
                                'errorDetails': "The password did not match"
                            }
                        });
                    }
                } else {
                    res.send({
                        'data': {},
                        'error': {
                            'errorCode': "Email Unverified",
                            'errorDetails': "Please verify your email"
                        }
                    });
                }
            } else {
                res.send({
                    'data': {},
                    'error': {
                        'errorCode': "Invalid Email",
                        'errorDetails': "There is no user with this email"
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
});

router.post('/doctor/register', async (req, res) => {
    let con = connection();
    let doctorsname = req.body.doctorsname;
    let degree = req.body.degree;
    let department = req.body.department;
    let hospital=req.body.hospital;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password, salt);

    try {
        let query = "CREATE TABLE IF NOT EXISTS doctorusers (doctorsname VARCHAR(255),degree VARCHAR(255), department VARCHAR(255),hospital VARCHAR(255), email VARCHAR(255), userToken VARCHAR(255), password VARCHAR(255), verified VARCHAR(255), type VARCHAR(255))"
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("User Table Created");
        });

        query = `SELECT * FROM doctorusers WHERE email = '${email}'`;
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 1) {
                res.send({
                    'data': {},
                    'error': {
                        'errorCode': 'Email Already Used',
                        'errorDetails': 'The email is already used'
                    }
                });
            } else {
                let userToken = utils.makeToken("USER");
                query = `INSERT INTO doctorusers (doctorsname,degree, department, hospital, userToken, email, password, verified, type) VALUES ('${doctorsname}','${degree}', '${department}','${hospital}','${userToken}', '${email}', '${password}', 'No', 'User')`
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }
                });

                query = "CREATE TABLE IF NOT EXISTS usersVerification (userToken VARCHAR(255), emailVerificationToken VARCHAR(255), status VARCHAR(255))"
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }

                    console.log("User Verification Table Created");
                });

                let emailVerificationToken = utils.makeToken("VerifyEmail");
                query = `INSERT INTO usersVerification (userToken, emailVerificationToken, status) VALUES ('${userToken}', '${emailVerificationToken}', 'Not Verified')`
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }
                });
                sendEmail(email, emailVerificationToken);

                res.send({
                    'data': {
                        'code': 'INSERTION_SUCCESSFUL',
                        'details': 'Verification Email Sent'
                    },
                    'error': {}
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
});

module.exports = router;