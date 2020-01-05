var express = require('express');
var router = express.Router();
var cors = require('cors');
var mongc = require('mongodb').MongoClient;
var jwt = require('jsonwebtoken');

var usrmongo = '';
var passmongo = '';
var host = '';
var db = '';
var url = 'mongodb://' + usrmongo + ':' + passmongo + '@' + host + '/' + db;
var nodemailer = require('nodemailer');
var usrmail = '';
var usrpass = '';
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: usrmail,
        pass: usrpass
    }
});
router.use(cors());

router.post('/', function (req, res) {
    try {
        var body = req.body;
        //¿porque se envian los datos en la key...?
        var accesoUsuario;
        for (var key in body) {
            accesoUsuario = key;
        }
        accesoUsuario = JSON.parse(accesoUsuario);
        let email = accesoUsuario.email;
        let minimo = 1;
        let maximo = 999999
        let codigo = Math.round(Math.random() * (maximo - minimo) + minimo);
        let jsonMc = { email: email, codigo: codigo, fecha: new Date() }
        mongc.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
            if (error) {
                res.json({ error: true, mensaje: 'error' })
            }
            else {
                let col = client.db(db).collection('col')
                col.insertOne(jsonMc);
                //client.close();
                var mailOptions = {
                    from: usrmail,
                    to: email,
                    subject: 'Código de verificación',
                    text: 'El código de verificación es: ' + codigo
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.json({ mensaje: 'codigo agregado', valido: true })
            }
        })
    }
    catch (error) {
        res.json({ error: true, mensaje: 'error' })
    }
})

router.post('/vercodigo', function (req, res) {
    try {
        var body = req.body;
        //¿porque se envian los datos en la key...?
        var accesoUsuario;
        for (var key in body) {
            accesoUsuario = key;
        }
        accesoUsuario = JSON.parse(accesoUsuario);
        let email = accesoUsuario.email;
        email = email.split(',')

        mongc.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
            let col = client.db(db).collection('col')
            col.aggregate(
                [
                    { $sort: { _id: 1, fecha: 1 } },
                    { $match: { email: { $in: email } } },
                    {
                        $group:
                        {
                            _id: "$email",
                            fecha: { $last: "$fecha" },
                            codigo: { $last: "$codigo" },
                        }
                    }
                ]
            ).toArray((error, data) => {
                if (error) {
                    res.json({ error: true, mensaje: 'error' })
                }
                else if (data[0].codigo === parseInt(accesoUsuario.codigo)) {//autorizar
                    let aut = jwt.sign({ codigo: accesoUsuario.codigo, email: data[0].email }, accesoUsuario.codigo, { expiresIn: '50s' });
                    res.json({ error: false, mensaje: '¡Bienvenid@!', aut: aut })
                }
                else {
                    res.json({ error: true, mensaje: 'El codigo es incorrecto' })
                }
            });
        })
    }
    catch (error) {
        res.json({ error: true, mensaje: 'El codigo es incorrecto' })
    }
})



module.exports = router;