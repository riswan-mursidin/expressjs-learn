const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");
const { query } = require("express");

// route / URL / endpoint utama method GET

app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(200, "API v1 ready to go", "Lala yeye haha", res);
});

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT *  FROM mahasiswa";
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "Mahasiswa get list", res);
  });
});

app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT *  FROM mahasiswa where nim = ${nim}`;
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "Get detail mahasiswa", res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, namalengkap, kelas, alamat } = req.body;
  const sql = `INSERT INTO mahasiswa (nim, namalengkap, kelas, alamat) VALUES (${nim}, '${namalengkap}', '${kelas}', '${alamat}')`;

  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "Data Added Succesfully", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { nim, namalengkap, kelas, alamat } = req.body;
  const sql = `UPDATE mahasiswa SET namalengkap = '${namalengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${nim}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, "Data edit succesfuly", res);
    } else {
      response(404, "User Nout Found", "error", res);
    }
  });
});

app.delete("/mahasiswa", (req, res) => {
  const { nim } = req.body;
  const sql = `DELETE FROM mahasiswa WHERE nim  = ${nim}`;
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res);
    if (fields?.affectedRows) {
      const data = {
        isDeleted: fields.affectedRows,
      };
      response(200, data, "Data deleted succesfuly", res);
    } else {
      response(404, "User Nout Found", "error", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
