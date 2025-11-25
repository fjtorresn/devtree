import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount, getUser, login, updateProfile, uploadImage } from './handlers';
import { handleInputErros } from './middleware/validation';
import { authenticate } from './middleware/auth';

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

router.get("/user", authenticate, getUser);

router.patch("/user",
  body('handle')
    .notEmpty()
    .withMessage('El handle no puede ir vacío'),
  body('description')
    .notEmpty()
    .withMessage('La descripción no puede ir vacía'),
  handleInputErros,
  authenticate,
  updateProfile
)

router.post('/user/image', authenticate, uploadImage);

export default router;
