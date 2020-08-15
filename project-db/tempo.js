var mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'az3z3l',
    database: 'security',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


async function get(){
    const number = await pool.query("select * from users where username='dumb' and password='dumb';");

    try{
        console.log(number[0][0].id)
    }
    catch{
        console.log("nond")
    }
}

 get()