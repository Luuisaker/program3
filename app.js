const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);


const db = new sqlite3.Database('./routes/database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado');
    }
});


app.get('/Catalogo', (req, res) => {
    const sql = `
        SELECT productos.ID, productos.Codigo, productos.Productos, categorias.Categoria, productos.Existencia_actual, productos.Precio
        FROM productos
        JOIN categorias ON productos.Categoria_ID = categorias.ID 
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al consultar la base de datos');
            return;
        }
        res.render('Catalogo', { records: rows });
    });
});

app.get('/electronica', (req, res) => {
    const sql = `
        SELECT productos.ID, productos.Codigo, productos.Productos, categorias.Categoria, productos.Existencia_actual, productos.Precio
        FROM productos
        JOIN categorias ON productos.Categoria_ID = categorias.ID
        WHERE categorias.ID = 1
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al consultar la base de datos');
            return;
        }
        res.render('electronica', { records: rows });
    });
});

app.get('/Papeleria', (req, res) => {
    const sql = `
        SELECT productos.ID, productos.Codigo, productos.Productos, categorias.Categoria, productos.Existencia_actual, productos.Precio
        FROM productos
        JOIN categorias ON productos.Categoria_ID = categorias.ID
        WHERE categorias.ID = 2
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al consultar la base de datos');
            return;
        }
        res.render('Papeleria', { records: rows });
    });
});

app.get('/Comida', (req, res) => {
    const sql = `
        SELECT productos.ID, productos.Codigo, productos.Productos, categorias.Categoria, productos.Existencia_actual, productos.Precio
        FROM productos
        JOIN categorias ON productos.Categoria_ID = categorias.ID
        WHERE categorias.ID = 3
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al consultar la base de datos');
            return;
        }
        res.render('Comida', { records: rows });
    });
});

app.get('/Aseo', (req, res) => {
    const sql = `
        SELECT productos.ID, productos.Codigo, productos.Productos, categorias.Categoria, productos.Existencia_actual, productos.Precio
        FROM productos
        JOIN categorias ON productos.Categoria_ID = categorias.ID
        WHERE categorias.ID = 4
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al consultar la base de datos');
            return;
        }
        res.render('Aseo', { records: rows });
    });
});

app.get('/Productos', (req, res) => {
    const sql = `
        SELECT productos.ID, productos.Codigo, productos.Productos, categorias.Categoria, productos.Existencia_actual, productos.Precio
        FROM productos
        JOIN categorias ON productos.Categoria_ID = categorias.ID 
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al consultar la base de datos');
            return;
        }
        res.render('Productos', { records: rows });
    });
});

app.route("/Catalogo")
    .get(function (req, res) {
        res.render("Catalogo");
    });

app.route("/Categoria")
    .get(function (req, res) {
        res.render("Categoria");
    });

app.route('/Productos')
    .get(function (req, res) {
        res.render('Productos');
    });


app.use(function (req, res, next) {
    next(createError(404));
});


app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;