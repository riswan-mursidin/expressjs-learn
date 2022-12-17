const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

// route / URL / endpoint utama method GET

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Ok Halaman Utama")
})

app.get("/mahasiswa",(req, res) => {
    res.send("Ini adalah halaman List Mahasiswa")
})

app.get("/mahasiswa/:nim",(req, res) => {
    const nim = req.params.nim;
    res.send(`Spesifik mahasiswa by Nim ${nim}`)
})


app.post("/mahasiswa",(req, res) => {
    res.send("ini Posting")
})

app.put("/mahasiswa",(req, res) => {
    res.send("ini Put atau update data")
})

app.delete("/mahasiswa",(req, res) => {
    res.send("ini Delete data")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// Pembelajaran sesi 1-4
// app.get('/', (req, res) => {
//     const sql = "SELECT * FROM mahasiswa"
//     db.query(sql, (error, result) => {
//         // hasil data dari mysql
//         response(200, result, "get all data from mahasiswa", res)
//     })
//   })
// // Mengambil paramater dari URL
// app.get('/find', (req, res) => {
//     const sql = `SELECT namalengkap FROM mahasiswa WHERE nim = ${req.query.nim}`
//     db.query(sql,(error, result) => {
//         response(200, result, "find mahasiswa name", res)
//     })
// })
// // Mengambil data dari postman
// app.post('/login', (req, res) => {
//     console.log({ requestFromOutside: req.body})
//     res.send('Login Berhasil')
//   })
// // Mengupdate data di Postman
//   app.put('/username',(req,res) => {
//     console.log({updateData : req.body})
//     res.send('Update Berhasil!')
//   })

