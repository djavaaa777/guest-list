const express = require('express');
const conn = require('./db');

const app = express();
app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const message = req.query.message || null;

    const query = 'SELECT * FROM guests';
    conn.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.send('Error while receiving data');
        }
        res.render('index', { guests: result, message });
    });
});

app.delete('/guests/:guestId',(req,res)=>{
    const id=req.params.guestId
    const query='DELETE FROM guests WHERE id=?'
    conn.query(query,[id],(err,result)=>{
        if(err){
            console.log(err)
            return res.json({ success: false, redirect: '/?message=error' })
        }else{
            console.log("Guest is succesfully deleted")
            return res.json({ success: true , redirect: '/?message=deleted' })
        }
    })
})

app.put("/guests/:guestId",(req,res)=>{
    const id=req.params.guestId
    const {
        full_name,
        email,
        country,
        check_in,
        check_out,
        room_type,
        room_number
      } = req.body;
    const query=`UPDATE guests SET full_name = ?, email = ?, country = ?, check_in = ?, check_out = ?, room_type = ?, room_number = ? WHERE id = ?`;
    const values = [full_name, email, country, check_in, check_out, room_type, room_number, id];
    conn.query(query,values,(err,result)=>{
        if(err){
            console.log(err)
            return res.json({ success: false, redirect: '/?message=error' })
        }else{
            console.log("Guest is succesfully deleted")
            return res.json({ success: true , redirect: '/?message=updated' })
        }
    })
})

app.post('/checked', (req, res) => {
    const { full_name, email = '', country, check_in, check_out, room_type, room_number } = req.body;
    const query = `INSERT INTO guests (full_name, email, country, check_in, check_out, room_type, room_number) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [full_name, email, country, check_in, check_out, room_type, room_number];

    conn.query(query, values, (err) => {
        if (err) {
            console.log(err);
            return res.redirect('/?message=error');
        }
        console.log('Guest added successfully');
        return res.redirect('/?message=success');
    });
});
  
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is created on: http://localhost:${PORT}`);
});
