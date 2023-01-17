const mysql = require("mysql2")
const dotenv = require("dotenv")
dotenv.config()

const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
  })
  .promise()

async function getNotes(searchTerm) {
 
  if (!searchTerm){

  let query = `
  SELECT * 
  FROM notes
  `
  const [rows] = await pool.query(query)
  return rows
}

  let query = `
  SELECT * FROM notes
  WHERE title LIKE CONCAT('%',?,'%')
  `
  const [rows] = await pool.query(query, [searchTerm])

  return rows

}



exports.getNotes = getNotes
// const note = await getNote(1)
// console.log(note)

 async function getNote(id) {
  let query = `
  SELECT * 
  FROM notes
  WHERE id = ?
  `
try{
  const [rows] = await pool.query(query, [id])
  console.log(rows)
  return rows[0]
  } catch(error) {
    console.log("error", error)
  }
}

exports.getNote = getNote
// async function getNote(id) {

// }
// exports.getNote = getNote

async function addNote(data) {
  const [result] = await pool.query(`
  INSERT INTO notes (title, contents)
  VALUES (?, ?)
  `, [data.title, data.contents])
  return result
}
exports.addNote = addNote

async function deleteNote(id) {
  const [result] = await pool.query(`
  DELETE FROM notes
  WHERE id = ?
  `, [id])
  return result
}
exports.deleteNote = deleteNote
