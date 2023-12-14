const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 3000;

app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());

app.use(express.json(
    {
        urlencoded: true,
    }
))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

const upload = multer({ dest: 'uploads/' });

const sequelize = new Sequelize('mazzatech', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

const Person = sequelize.define('Person', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    photo: {
        type: DataTypes.STRING,
    },
});

sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado');
}).catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
});

// API para salvar dados
app.post('/api/save', upload.single('photo'), async (req, res) => {
    const { name, email, cpf } = req.body;
    const photoFileName = req.file ? req.file.filename : null;

    try {
        const person = await Person.create({ name, email, cpf, photo: photoFileName });
        res.send('Registro salvo com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao salvar o registro');
    }
});


// API para editar dados
app.put('/api/edit/:id', upload.single('photo'), async (req, res) => {
    const { name, email, cpf } = req.body;
    const { id } = req.params;
    const photoPath = req.file ? req.file.filename : null;

    try {
        // Verificar se uma nova imagem foi enviada
        const existingPerson = await Person.findByPk(id);
        const existingPhoto = existingPerson ? existingPerson.photo : null;

        // Atualizar apenas a foto se uma nova foto foi enviada, caso contrário, manter a existente
        await Person.update(
            { name, email, cpf, photo: photoPath || existingPhoto },
            { where: { id } }
        );

        res.send('Registro editado com sucesso!');
    } catch (error) {
        console.error('Erro ao editar o registro:', error);
        res.status(500).send('Erro interno ao editar o registro');
    }
});


// Rota para listar dados
app.get('/api/list', async (req, res) => {
    try {
        const data = await Person.findAll();
        res.json(data);
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        res.status(500).send('Erro interno ao obter dados');
    }
});

// API para excluir dados
app.delete('/api/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Person.destroy({ where: { id } });
        res.send('Registro excluído com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao excluir o registro');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
