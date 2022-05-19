import { App } from './app';

const app = new App();

const PORT = process.env.PORT || 3000;

app.start(PORT);
