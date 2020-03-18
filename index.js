const express = require('express');
const app = express();
const path = require("path");
const dotenv = require("dotenv").config();

app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "public"));
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, "")));

app.use(express.json());

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(process.env.DATABASE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the shopping-cart database.');
});

app.get('/', (req, res, err) => {
  res.render('views/index.html');
});

app.get('/allShoppingLists', (req, res) => {
  db.serialize(() => {
    db.all(`SELECT Id as id,
                    Name as name
             FROM shopping_lists`, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.send(rows);
    });
  });
});

app.get('/shoppingItems', (req, res) => {
  db.serialize(() => {
    db.all(`SELECT Id as id,
                    Name as name,
                    Quantity as quantity,
                    Category as category,
                    Shopping_list as shopping_list
             FROM items`, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.send(rows);
    });
  });
});

app.get('/shoppingItemById/:id', (req, res) => {
  db.serialize(() => {
    db.get(`SELECT Id as id,
                    Name as name,
                    Quantity as quantity,
                    Category as category,
                    Shopping_list as shopping_list
            FROM items i
            WHERE id = ?`, [req.params.id], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      res.send(row);
    });
  });
});

app.delete('/shoppingItem/:id', (req, res) => {
  db.run(`DELETE FROM items WHERE id = ?`, [req.params.id], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) deleted ${this.changes}`);
    res.sendStatus(200);
  });
});

app.post('/shoppingItem', (req, res) => {
    db.run(`INSERT INTO items(name, quantity, category, shopping_list) VALUES(?,?,?,?)`, [req.body.name, req.body.quantity, req.body.category, req.body.shopping_list], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log([req.body.name, req.body.quantity, req.body.category, req.body.shopping_list])
      
      let result = {
        id: this.lastID
      };
      
      res.send(result);
    });
  });

app.post('/shoppingLists', (req, res) => {
  db.run(`INSERT INTO shopping_lists(name) VALUES(?)`, [req.body.name], function(err) {
    if (err) {
      return console.log(err.message);
    }
    
    let result = {
      id: this.lastID
    };
    
    res.send(result);
  });
})

app.put('/shoppingItem', (req, res) => {
  console.log(req.body)
  db.run(`UPDATE items SET name = ?, 
                          quantity = ?, 
                          category = ?, 
                          shopping_list = ? 
          WHERE id = ?`, [req.body.name, req.body.quantity, req.body.category, req.body.shopping_list, req.body.id], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);

    res.sendStatus(200);
  });
})

app.listen(5005, () => {
  console.log("listening on http://localhost:5005");
});