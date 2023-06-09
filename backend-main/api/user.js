const express = require('express');
const router = express.Router();
const utils = require('../helpers/utils');
const { connection } = require('../db');
const fs = require("fs");
const path = require('path');
const ba64 = require("ba64");
const { SystemVars } = require('../systemVars');

router.post('/patients/new', async (req, res) => {
    let con = connection();
    let name = req.body.name;
     let age = parseInt(req.body.age);
      let address = req.body.address;
      let email = req.body.email;
    let description = req.body.description;
    let nid = parseInt(req.body.nid);
    let isMale = req.body.isMale;
    let isFemale = req.body.isFemale;
    let phoneNumber = req.body.phoneNumber;
    let image = req.body.image;
    let doctorSlug = req.body.doctorSlug;
    let departmentSlug = req.body.departmentSlug;
    let createdBy = req.headers.usertoken;

    try {
        let query = "CREATE TABLE IF NOT EXISTS appointments (token VARCHAR(255), name VARCHAR(255), age INT(255), email VARCHAR(255), address VARCHAR(255), description VARCHAR(255), image VARCHAR(255), nid INT(255), isMale BOOL, isFemale BOOL, phoneNumber VARCHAR(255), doctorSlug VARCHAR(255), departmentSlug VARCHAR(255), createdBy VARCHAR (255), treated VARCHAR(255), createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Appointments Table Accessed");
        });

        let uploadDir = path.join(SystemVars.DIR_NAME, "images");
        let newImageName = "";
        if (fs.existsSync(uploadDir)) {
            let imageToken = utils.makeToken("Image");
            let saveImage = ba64.writeImageSync(path.join(uploadDir, imageToken), image);
            let extension = image.split(';')[0].split('/')[1];
            newImageName = imageToken + '.' + extension;
        }

        let token = utils.makeToken("Appointments"); 
        query = `INSERT INTO appointments (token, name , age, email, address, description, image, nid, isMale, isFemale, phoneNumber, doctorSlug, departmentSlug, createdBy, treated) VALUES('${token}', '${name}', '${age}', '${email}', '${address}', '${description}', '${newImageName}', '${nid}', ${isMale}, ${isFemale}, '${phoneNumber}', '${doctorSlug}', '${departmentSlug}', '${createdBy}', 'No')`;
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'INSERTION_SUCCESSFUL',
                    'details': 'Patient Posted!',
                },
                'error': {}
            });
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

router.get('/patients', async (req, res) => {
    let con = connection();
    let createdBy = req.headers.usertoken;

    try {
        let query = "CREATE TABLE IF NOT EXISTS appointments (token VARCHAR(255), name VARCHAR(255), age INT(255), email VARCHAR(255), address VARCHAR(255), description VARCHAR(255), image VARCHAR(255), nid INT(255), isMale BOOL, isFemale BOOL, phoneNumber VARCHAR(255), doctorSlug VARCHAR(255), departmentSlug VARCHAR(255), createdBy VARCHAR (255), treated VARCHAR(255), createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Appointments Table Accessed");
        });

        let token = utils.makeToken("Appointments"); 
        query = `SELECT * FROM appointments WHERE createdBy='${createdBy}' AND treated = "No"  ORDER BY createdAt DESC`;
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

router.get('/mark/treated/:postToken', async (req, res) => {
    let con = connection();
    let userToken = req.headers.usertoken;
    let postToken = req.params.postToken;

    try {
        let query = `UPDATE appointments SET treated='Yes' WHERE createdBy='${userToken}' AND token='${postToken}'`;
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'INSERTION_SUCCESSFUL',
                    'details': 'Patient marked as treated',
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


router.get('/details', async (req, res) => {
    let con = connection();
    let userToken = req.headers.usertoken;

    // console.log(req.headers);
    try {
        let query = `SELECT users.hospitalname, users.location, users.email, users.userToken, (SELECT COUNT(*) FROM appointments WHERE createdBy='${userToken}' AND treated='No') as totalPatients, (SELECT COUNT(*) FROM appointments WHERE createdBy='${userToken}' AND treated='Yes') as treatedPatients FROM users WHERE userToken='${userToken}'`;
        con.query(query, (err, result) => {
            
            console.log(result);

            if (err) {
                throw err;
            }

            
            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': result[0],
                },
                'error': {}
            });
        });
    } catch (error) {
        // console.log(error);
        res.send({
            'data': {},
            'error': {
                'errorCode': 'Query failed at try catch',
                'errorDetails': error,
            }
        });
    }
});

router.post('/prescription/new', async (req, res) => {
    let con = connection();
    let name = req.body.name;
    let image = req.body.image;

    try {
        let query = "CREATE TABLE IF NOT EXISTS prescriptions (token VARCHAR(255), name VARCHAR(255),  image VARCHAR(255))";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Prescription Table Accessed");
        });

        let uploadDir = path.join(SystemVars.DIR_NAME, "images");
        let newImageName = "";
        if (fs.existsSync(uploadDir)) {
            let imageToken = utils.makeToken("Image");
            let saveImage = ba64.writeImageSync(path.join(uploadDir, imageToken), image);
            let extension = image.split(';')[0].split('/')[1];
            newImageName = imageToken + '.' + extension;
        }

        let token = utils.makeToken("Prescriptions"); 
        query = `INSERT INTO prescriptions (token, name , image) VALUES('${token}', '${name}', '${newImageName}')`;
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'INSERTION_SUCCESSFUL',
                    'details': 'Prescription Posted!',
                },
                'error': {}
            });
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


router.post('/reports/new', async (req, res) => {
    let con = connection();
    let name = req.body.name;
    let image = req.body.image;

    try {
        let query = "CREATE TABLE IF NOT EXISTS reports (token VARCHAR(255), name VARCHAR(255),  image VARCHAR(255))";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Reports Table Accessed");
        });

        let uploadDir = path.join(SystemVars.DIR_NAME, "images");
        let newImageName = "";
        if (fs.existsSync(uploadDir)) {
            let imageToken = utils.makeToken("Image");
            let saveImage = ba64.writeImageSync(path.join(uploadDir, imageToken), image);
            let extension = image.split(';')[0].split('/')[1];
            newImageName = imageToken + '.' + extension;
        }

        let token = utils.makeToken("Reports"); 
        query = `INSERT INTO reports (token, name , image) VALUES('${token}', '${name}', '${newImageName}')`;
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'INSERTION_SUCCESSFUL',
                    'details': 'Reports Posted!',
                },
                'error': {}
            });
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

router.get('/reports/:name', async (req, res) => {
    let con = connection();
    let name = req.params.name;

    // console.log(req.headers);
    try {
        let query = `SELECT * from reports WHERE name= '${name}'`;
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 1) {
                res.send({
                    'data': {
                        'code': 'LIST_LOADED',
                        'details': result[0],
                    },
                    'error': {}
                });
            } else {
                res.send({
                    'data': {},
                    'error': {
                        'errorCode': 'Invalid  Token',
                        'errorDetails': 'No data found with the given token',
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

router.get('/doctor/details', async (req, res) => {
    let con = connection();
    let doctorsname = req.headers.doctorsname;

    // console.log(req.headers);
    try {
        let query = `SELECT doctorusers.doctorsname, doctorusers.degree, doctorusers.department, doctorusers.hospital, doctorusers.email, doctorusers.userToken, (SELECT COUNT(*) FROM appointments WHERE doctorSlug='${doctorsname}' AND treated='No') as totalPatients, (SELECT COUNT(*) FROM appointments WHERE doctorSlug='${doctorsname}' AND treated='Yes') as treatedPatients FROM doctorusers WHERE doctorsname='${doctorsname}'`;
        con.query(query, (err, result) => {
            
            console.log(result);

            if (err) {
                throw err;
            }

            
            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': result[0],
                },
                'error': {}
            });
        });
    } catch (error) {
        // console.log(error);
        res.send({      
            'data': {},
            'error': {
                'errorCode': 'Query failed at try catch',
                'errorDetails': error,
            }
        });
    }
});

router.get('/doctor/details', async (req, res) => {
    let con = connection();
    let doctorsname = req.headers.doctorsname;
  
    try {
      let query = `SELECT doctorusers.doctorsname, doctorusers.degree, doctorusers.department, doctorusers.hospital, doctorusers.email, doctorusers.userToken,
        (SELECT COUNT(*) FROM appointments WHERE doctorSlug = '${doctorsname}' AND treated = 'No') AS untreatedPatients,
        (SELECT COUNT(*) FROM appointments WHERE doctorSlug = '${doctorsname}' AND treated = 'Yes') AS treatedPatients
        FROM doctorusers WHERE doctorsname = '${doctorsname}'`;
  
      con.query(query, (err, result) => {
        if (err) {
          throw err;
        }
  
        res.send({
          'data': {
            'code': 'LIST_LOADED',
            'details': result[0],
          },
          'error': {}
        });
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
  
router.get('/doctor/appointments', async (req, res) => {
    let con = connection();
    let doctorsname = req.headers.doctorsname;
  
    try {
      let query = `CREATE TABLE IF NOT EXISTS appointments (
        token VARCHAR(255),
        name VARCHAR(255),
        age INT(255),
        email VARCHAR(255),
        address VARCHAR(255),
        description VARCHAR(255),
        image VARCHAR(255),
        nid INT(255),
        isMale BOOL,
        isFemale BOOL,
        phoneNumber VARCHAR(255),
        doctorSlug VARCHAR(255),
        departmentSlug VARCHAR(255),
        createdBy VARCHAR(255),
        treated VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;
  
      con.query(query, (err, result) => {
        if (err) {
          throw err;
        }
  
        console.log("Appointments Table Accessed");
      });
  
      query = `SELECT * FROM appointments
               JOIN doctorusers ON appointments.doctorSlug = doctorusers.doctorsname
               WHERE doctorusers.doctorsname = '${doctorsname}' AND treated = "No"
               ORDER BY createdAt ASC`;
  
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
        });
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