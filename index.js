const express = require('express');
const app = express();
const path = require("path");

app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "public"));
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, "")));

app.use(express.json());

const sqlite3 = require('sqlite3').verbose();


let db = new sqlite3.Database('shopping-cart-db.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the shopping-cart database.');
});

app.get('/', (req, res, err) => {
  res.render('views/index.html')
});

app.get('/allShoppingLists', (req, res) => {
  db.serialize(() => {
    db.each(`SELECT Id as id,
                    Name as name
             FROM shopping_lists`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      res.send(row)
      console.log(row.id + "\t" + row.name);
    });
  });
});

app.get('/itemsInList', (req, res) => {
  db.serialize(() => {
    db.each(`SELECT Id as id,
                    Name as name,
                    Quantity as quantity,
                    Category as category,
                    Shopping_list as shopping_list
             FROM items`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      res.send(row)
      console.log(row.id + "\t" + row.name);
    });
  });
})


app.listen(5005, () => {
  console.log("listening on http://localhost:5005");
});