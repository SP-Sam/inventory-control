import express, { Express } from 'express';

class App {
  private app: Express;

  constructor() {
    this.app = express();
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  }
}

export { App };
