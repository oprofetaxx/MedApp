import bcrypt from 'bcrypt';
import express from "express";
import doctorService from "../services/DoctorService.js";
import appointmentController from "./AppointmentController.js";
import doctorController from "./DoctorController.js";
import pacientController from "./PacientController.js";
import prescriptionController from "./PrescriptionController.js";
import jwt from 'jsonwebtoken';

let router = express.Router();

// Rota inicial simples
router.get("/", function (req, res) {
    console.log("hi!");
    res.status(200).json({ message: "hi!" });
});

// Rota para login (Authentication)
router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;
        const doctor = await doctorService.getDoctorByLogin(login);

        if (!doctor) {
            return res.status(401).json({ error: 'Authentication failed!' });
        }

        const passwordMatch = await bcrypt.compare(password, doctor.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed!' });
        }

        // Geração de token JWT
        const token = jwt.sign({ doctorId: doctor._id }, 'you-secret-key', {
            expiresIn: '1000h',
        });
        res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed!' });
    }
});

// Adicionando as rotas dos controllers
router.use("/appointments", appointmentController);   // Cuidado para não duplicar as rotas de /appointments
router.use("/doctors", doctorController);             // Certifique-se que /doctors está configurado no doctorController
router.use("/patients", pacientController);           // Renomeei para "/patients" para uma boa prática de nomenclatura
router.use("/prescriptions", prescriptionController); // Prescrição também com caminho de URL consistente

export default router;
