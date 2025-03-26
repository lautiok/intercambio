import express from 'express';
import morgan from 'morgan';
import UsersRoutes from '../routes/v1/users.routes';
import InstitutionalRoutes from '../routes/v1/intitucional.routes';
import AuthRoutes from '../routes/v1/auth.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUI from "swagger-ui-express"
import specs from '../config/swaggerConfig';
import { ckeckSession } from '../middleware/sessionMiddleware';
import { checkRole } from '../middleware/rolesMiddleware';
import { config } from '../config/config';
const app: express.Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors(
    {
        origin: config.url,
        credentials: true,
    }
));

app.use("/api/v1/users", ckeckSession, checkRole("admin") , UsersRoutes);
app.use("/api/v1/institucional", ckeckSession, checkRole("admin") , InstitutionalRoutes);
app.use("/api/v1/documents", swaggerUI.serve, swaggerUI.setup(specs)) 
app.use("/api/v1/auth", AuthRoutes); 


export default app;