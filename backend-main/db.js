const mysql = require('mysql');

module.exports = {
    connection: () => {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "shasthoseba"
        });

        return con;
    },
}