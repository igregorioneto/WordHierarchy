import express, { json, urlencoded } from "express";
import cors from "cors";
import { setupSwagger } from "./swagger";
import wordHierarckyRoutes from "./app/routes/wordHierarckyRoutes";

const createServer = () => {
  const app = express();
  const port = 3000;

  app.use(cors());

  app.use(json());
  app.use(urlencoded({ extended: true }));

  // Routes
  app.use('/wordHierarchy', wordHierarckyRoutes);

  setupSwagger(app);

  return { app, port };
}

export { createServer };