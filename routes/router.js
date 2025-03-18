import express from "express";
import appointmentController from "./AppointmentController.js";
import doctorController from "./DoctorController.js";
import pacientController from "./PacientController.js";
import prescriptionController from "./PrescriptionController.js";
import DoctorService from "../services/DoctorService.js";
import bcrypt from "bcrypt";
import verifyToken from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";

let router = express.Router();

router.get("/", function (req, res) {
    console.log("h1");
    res.status(200).json({
        message: "Hello "
    });
});

// Mapeamento do login
router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;
        const doctor = await DoctorService.getDoctorByLogin(login);
        if (!doctor) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(password, doctor.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const token = jwt.sign({ doctorId: doctor._id }, 'secretKey', {
            expiresIn: '1h'
        });
        
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

// Definindo as rotas corretamente
router.use("/appointments", verifyToken, appointmentController);
router.use("/doctors", verifyToken, doctorController);
router.use("/patients", verifyToken, pacientController);
router.use("/prescriptions", verifyToken, prescriptionController);


export default router;