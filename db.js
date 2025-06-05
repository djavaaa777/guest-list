const express=require('express')
const mysql=require('mysql2')

const app=express()

const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'guestbook',
    password:'',
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