import express from "express";
import appointmentController from "./AppointmentController.js";
import doctorController from "./DoctorController.js";
import pacientController from "./PacientController.js";
import prescriptionController from "./PrescriptionController.js";

let router = express.Router();

router.get("/", function (req, res){
    console.log("h1");
    res.status(200).json({
        message: "Hello "
    });
})

// Definindo as rotas corretamente
router.use("/appointments", appointmentController);
router.use("/doctors", doctorController);
router.use("/patients", pacientController);
router.use("/prescriptions", prescriptionController);

export default router;