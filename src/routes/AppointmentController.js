import express from "express";
import AppointmentService from "../services/AppointmentService.js";

let router = express.Router();

// Rota para obter todos os agendamentos
router.get('/', async (req, res) => {
    try {
        const appointments = await AppointmentService.getAllAppointments();
        res.send(appointments);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Rota para obter um agendamento específico por ID
router.get('/getAppointment/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await AppointmentService.getAppointment(id);
        res.send(appointment);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Rota para criar um novo agendamento
router.post('/create', async (req, res) => {
    const { date, doctorId, pacientId } = req.body;
    try {
        const appointment = await AppointmentService.saveAppointment({ date, doctorId, pacientId });
        res.send(appointment);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Rota para atualizar um agendamento existente
router.put('/att/:id', async (req, res) => {
    const { id } = req.params;
    const { date, doctorId, pacientId } = req.body;
    try {
        const appointment = await AppointmentService.updateAppointment(id, { date, doctorId, pacientId });
        res.send(appointment);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Rota para excluir um agendamento
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await AppointmentService.deleteAppointment(id);
        res.send({ message: "Agendamento excluído com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Rota para reagendar um agendamento existente
router.put('/reschedule/:id', async (req, res) => {
    const { id } = req.params;
    const { date } = req.body;
    try {
        const appointment = await AppointmentService.updateAppointment(id, { date });
        res.send(appointment);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

export default router;
