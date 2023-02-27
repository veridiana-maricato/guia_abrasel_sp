
(async () => {
    const db = require("./db")
    console.log('comecou')

    console.log('SELECT * FROM users;')
    const bares = await db.selectBares()

    
}) ()
