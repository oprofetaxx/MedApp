import express from "express";
import AppointmentService from "../services/AppointmentService.js";

let router = express.Router();

// Criar um agendamento (POST)
router.post('/postAppointment', async (req, res) => {
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

// ✅ Rota para obter todos os agendamentos (GET)
router.get('/', async (req, res) => {
    try {
        const appointments = await AppointmentService.getAllAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        res.status(500).json({ message: "Erro ao buscar agendamentos", error: error.message });
    }
});

// ✅ Rota para obter um agendamento específico por ID (GET)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await AppointmentService.getAppointmentById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Agendamento não encontrado" });
        }
        res.status(200).json(appointment);
    } catch (error) {
        console.error("Erro ao buscar agendamento:", error);
        res.status(500).json({ message: "Erro ao buscar agendamento", error: error.message });
    }
});

// ✅ Rota para atualizar um agendamento (PUT)
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { doctorId, patientId, date, time } = req.body;

    if (!doctorId || !patientId || !date || !time) {
        return res.status(400).json({ message: "Campos obrigatórios ausentes" });
    }

    try {
        const updatedAppointment = await AppointmentService.updateAppointment(id, {
            doctorId,
            patientId,
            date,
            time
        });

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Agendamento não encontrado" });
        }

        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error("Erro ao atualizar agendamento:", error);
        res.status(500).json({ message: "Erro ao atualizar agendamento", error: error.message });
    }
});

// ✅ Deletar uma consulta pelo ID (DELETE)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAppointment = await AppointmentService.deleteAppointment(id);  // Chama o serviço de deleção
        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        console.log("Erro ao deletar consulta:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

export default router;
