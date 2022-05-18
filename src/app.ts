import express, { Express, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';

import { productRouter } from './routers/ProductRouter';
import { rawMaterialRouter } from './routers/RawMaterialRouter';
import { productionRouter } from './routers/ProductionRouter';

import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware';

class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.routers();
    this.errors();
  }

  private config(): void {
    const corsOptions: CorsOptions = {
      allowedHeaders: ['*'],
      credentials: true,
      methods: 'POST,GET,PUT,PATCH,DELETE,OPTIONS,HEAD',
      origin: '*',
      preflightContinue: false,
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
  }

  private routers(): void {
    this.app.get('/', (_req: Request, res: Response) => {
      return res.status(200).json({ message: 'Welcome to Autoflex API!' });
    });

    this.app.use('/products', productRouter);
    this.app.use('/rawMaterials', rawMaterialRouter);
    this.app.use('/production', productionRouter);
  }

  private errors(): void {
    this.app.use(ErrorHandlerMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  }
}

export { App };
