import express from "express";
import cors from "cors";
import path from 'path';
import cookieParser from 'cookie-parser';
const app = express();

// not working for jwt verify
// app.use((req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//     );
//     next();
// });

app.use(cors({
  origin: [  
    'http://localhost:3000',
  ],
  credentials: true,
}));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({ extended: true, limit: '25mb' })); //parsing form data
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));// to serve the CV uploaded
app.use(cookieParser());
  
// Routes ---------------------------------------------------------------------------

const crudRoutes = require('./routes/crud.ts');
app.use(crudRoutes);

const applyRoute = require('./routes/apply.ts');
app.use(applyRoute);

const AuthRoutes = require('./routes/authentification.ts');
app.use(AuthRoutes);


// server listening -----------------------------------------------------------------
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});