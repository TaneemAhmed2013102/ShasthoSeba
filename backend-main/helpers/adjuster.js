const utils = require('../helpers/utils');
const { connection } = require('../db');

module.exports = {
    adjustTest: async (req, res) => {
        let con = connection();
        let query = "SELECT * FROM tests";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            query = "DROP TABLE tests";
            con.query(query, (err, result) => {
                if (err) {
                    throw err;
                }

                console.log("Test Table Dropped");
            });

            query = "CREATE TABLE IF NOT EXISTS tests (title VARCHAR(255), token VARCHAR(255), slug VARCHAR(255))"
            con.query(query, (err, result) => {
                if (err) {
                    throw err;
                }

                console.log("Test Table Created");
            });

            for (let i = 0; i < result.length; i++) {
                const currElem = result[i];
                query = `SELECT * FROM tests WHERE title='${currElem.title}'`
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }

                    if (result.length === 0) {
                        let slug = utils.makeSlug(currElem.title);
                        query = `INSERT INTO tests (title, token, slug) VALUES ('${currElem.title}', '${currElem.token}', '${slug}')`
                        con.query(query, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        });
                    }
                });
            }
        });

        res.send("DONE");
    },
}