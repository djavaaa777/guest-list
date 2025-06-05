const express=require('express')
const mysql=require('mysql2')

const app=express()

const conn=mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7783287",
  password: "E6sQkTN1nY",
  database: "sql7783287",
  port: 3306
})

conn.connect((err)=>{
    if(err){
        console.log(err)
        return err
    }
    else{
        console.log('Database------OK')
    }
})

module.exports = conn;