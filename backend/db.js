require('dotenv').config()

async function connect() {
    if (global.connection && global.connection.state !== "disconnected") {
        return global.connection
    }

    const mysql = require("mysql2/promise")

    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    }

    const connection = await mysql.createConnection(config);

    console.log('conectou')
    global.connection = connection
    return connection
}
connect()

async function selectBares() {
    const conn = await connect()
    const [rows] = await conn.query("SELECT nome FROM bares_abrasel;")
    // const [rows] = await conn.query("SELECT A. *, B.tipo AS categoria, C.tipo1 AS subcategoria FROM bares INNER JOIN tipo B ON (A.tipo = B.ntipo) INNER JOIN tipo1 C ON (A.tipo1 = C.ntipo1) WHERE A.ABRASEl = 'S' AND A.STATUSX = 1 AND A.VISIVEL = 'S' GROUP BY A.cod_produto ORDER BY A.nome;")
    return rows
}

// async function insertUser(user) {
//     const conn = await connect()
//     const sql = 'INSERT INTO users(first_name, last_name, email, password_hash) VALUES (?,?,?,?);'
//     const values = [user.first_name, user.last_name, user.email, user.password_hash]
//     return await conn.query(sql, values)
// }

// async function updateUser(id, user) {
//     const conn = await connect()
//     const sql = 'UPDATE users SET first_name=?, last_name=?, email=?, password_hash=? WHERE id=?'
//     const values = [user.first_name, user.last_name, user.email, user.password_hash, user.id]
//     return await conn.query(sql, values)
// }

module.exports = { selectBares }