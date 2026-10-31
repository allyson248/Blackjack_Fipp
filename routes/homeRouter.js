import express from 'express';
import HomeController from '../controllers/homeController.js';

const router = express.Router();
const controller = new HomeController();

router.get('/health', (req, res) => {
  // #swagger.tags = ['Sistema']
  // #swagger.summary = 'Verifica se a API está ativa'
  controller.status(req, res);
});

export default router;
