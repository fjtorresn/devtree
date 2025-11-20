import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount, login } from './handlers';
import { handleInputErros } from './middleware/validation';

const router = Router();

/** Autenticación y Registro */
router.post("/auth/register",
  body('handle')
    .notEmpty()
    .withMessage('El handle no puede ir vacío'),
  body('name')
    .notEmpty()
    .withMessage('El nombre no puede ir vacío'),
  body('email')
    .isEmail()
    .withMessage('El email no es válido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('El password debe tener al menos 8 caracteres'),
  handleInputErros,
  createAccount
);

router.post("/auth/login", 
  body('email')
    .isEmail()
    .withMessage('El email no es válido'),
  body('password')
    .notEmpty()
    .withMessage('El password no puede ir vacío'),
  handleInputErros,
  login
);

export default router;
