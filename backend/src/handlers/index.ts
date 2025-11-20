import { Request, Response } from 'express';
import slug from 'slug';
import User from '../models/User';
import { hashPassword, checkPassword } from '../utils/auth';
import { generateJWT } from '../utils/jwt';

export const createAccount = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
        const error = new Error('El email ya está registrado');
        return res.status(409).json({ error: error.message });
    }

    // Verificar si el handle ya existe
    const handle = slug(req.body.handle);
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
        const error = new Error('Nombre de usuario no disponible');
        return res.status(409).json({ error: error.message });
    }

    // Crear nuevo usuario
    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;
    await user.save();

    res.send("Registro exitoso");
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    // Verificar si el usuario está registrado
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ error: error.message });
    }

    // Verificar el password
    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!isPasswordCorrect) {
        const error = new Error('Password incorrecto');
        return res.status(403).json({ error: error.message });
    }

    const token = generateJWT({ id: user._id });

    res.send(token);
}