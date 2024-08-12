const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const db = require("./config/database.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Importar rutas
const UserRoute = require("./routes/UserRoute.js");

// const PacienteRoute = require("./routes/PacienteRoute.js");
// const AuthRoute = require("./routes/AuthRoute.js");
// const HistoriaClinicaRoute = require("./routes/HistoriaClinicaRoute.js");
// const PaisRoute = require("./routes/PaisRoute.js");

dotenv.config();

const app = express();

// Configuración de la base de datos
const sessionStore = new SequelizeStore({
    db: db
});

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors());
app.use(express.json());

// Usar las rutas
app.use(UserRoute);
// Agregar otras rutas aquí
// app.use('/pacientes', PacienteRoute);
// app.use('/auth', AuthRoute);
// app.use('/historias', HistoriaClinicaRoute);
// app.use('/paises', PaisRoute);

// Manejo de errores
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
