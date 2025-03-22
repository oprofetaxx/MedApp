import express from "express";
import AppointmentService from "../services/AppointmentService.js"; // Importando o serviço correto

const router = express.Router();

// ✅ Rota para obter todos os agendamentos
router.get("/", async (req, res) => {
    try {
        const appointments = await AppointmentService.getAllAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        console.log("Erro ao obter agendamentos:", error);
        res.status(500).json({ message: "Erro ao obter agendamentos", error: error.message });
    }
});

// ✅ Rota para obter um agendamento específico pelo ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await AppointmentService.getAppointmentById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Agendamento não encontrado" });
        }
        res.status(200).json(appointment);
    } catch (error) {
        console.log("Erro ao buscar agendamento:", error);
        res.status(500).json({ message: "Erro ao buscar agendamento", error: error.message });
    }
});

// ✅ Rota para criar um novo agendamento
router.post("/", async (req, res) => {
    const { doctorId, patientId, date, time } = req.body;

    if (!doctorId || !patientId || !date || !time) {
        return res.status(400).json({ message: "Campos obrigatórios ausentes" });
    }

    try {
        const appointment = await AppointmentService.saveAppointment({
            doctorId,
            patientId,
            date,
            time
        });
        res.status(201).json(appointment);
    } catch (error) {
        console.error("Erro ao salvar agendamento:", error);
        res.status(500).json({ message: "Erro ao salvar o agendamento", error: error.message });
    }
});

export default router;
