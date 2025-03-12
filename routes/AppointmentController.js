import express from "express";
import AppointmentService from "../services/AppointmentService.js";
import mongoose from "mongoose";

let router = express.Router();

// Função para validar ObjectId do MongoDB
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Criar um agendamento (POST)
router.post('/postAppointment', async (req, res) => {
    const { doctorId, patientId, date, time } = req.body;

    if (!doctorId || !patientId || !date || !time) {
        return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    if (!isValidObjectId(doctorId) || !isValidObjectId(patientId)) {
        return res.status(400).json({ message: "IDs inválidos fornecidos." });
    }

    try {
        const appointment = await AppointmentService.saveAppointment({ doctorId, patientId, date, time });
        res.status(201).json({ message: "Agendamento criado com sucesso!", appointment });
    } catch (error) {
        console.error("Erro ao salvar agendamento:", error);
        res.status(500).json({ message: "Erro ao salvar o agendamento.", error: error.message });
    }
});

// Rota para obter todos os agendamentos (GET)
router.get('/', async (req, res) => {
    try {
        const appointments = await AppointmentService.getAllAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        res.status(500).json({ message: "Erro ao buscar agendamentos.", error: error.message });
    }
});

// Rota para obter um agendamento específico por ID (GET)
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "ID inválido." });
    }

    try {
        const appointment = await AppointmentService.getAppointmentById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Agendamento não encontrado." });
        }
        res.status(200).json(appointment);
    } catch (error) {
        console.error("Erro ao buscar agendamento:", error);
        res.status(500).json({ message: "Erro ao buscar agendamento.", error: error.message });
    }
});

// Rota para atualizar um agendamento (PUT)
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { doctorId, patientId, date, time } = req.body;

    if (!isValidObjectId(id) || !isValidObjectId(doctorId) || !isValidObjectId(patientId)) {
        return res.status(400).json({ message: "ID inválido." });
    }

    if (!doctorId || !patientId || !date || !time) {
        return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    try {
        const updatedAppointment = await AppointmentService.updateAppointment(id, { doctorId, patientId, date, time });

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Agendamento não encontrado." });
        }

        res.status(200).json({ message: "Agendamento atualizado com sucesso!", updatedAppointment });
    } catch (error) {
        console.error("Erro ao atualizar agendamento:", error);
        res.status(500).json({ message: "Erro ao atualizar agendamento.", error: error.message });
    }
});

// Deletar um agendamento pelo ID (DELETE)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "ID inválido." });
    }

    try {
        const deletedAppointment = await AppointmentService.deleteAppointment(id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: "Agendamento não encontrado." });
        }
        res.status(200).json({ message: "Agendamento deletado com sucesso.", deletedAppointment });
    } catch (error) {
        console.log("Erro ao deletar consulta:", error);
        res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
    }
});

// Rota para remarcar um agendamento (PUT)
router.put('/reschedule/:id', async (req, res) => {
    const { id } = req.params;
    const { date } = req.body;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "ID inválido." });
    }

    if (!date) {
        return res.status(400).json({ message: "A nova data é obrigatória." });
    }

    try {
        const appointment = await AppointmentService.getAppointmentById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Agendamento não encontrado." });
        }

        const updatedAppointment = await AppointmentService.updateAppointment(id, { date });

        res.status(200).json({ message: "Agendamento remarcado com sucesso.", updatedAppointment });
    } catch (error) {
        console.error("Erro ao remarcar agendamento:", error);
        res.status(500).json({ message: "Erro ao remarcar agendamento.", error: error.message });
    }
});

export default router;
