// Importando o express para criar rotas e o AppointmentService para lidar com a lógica de negócios
import express from "express";
import AppointmentService from "../services/AppointmentService.js";

// Criando o roteador para a API de agendamentos
let router = express.Router();

// Rota para obter todos os agendamentos
router.get('/appointments', async (req, res) => {
    try {
        // Chamando o serviço para pegar todos os agendamentos
        const appointments = await AppointmentService.getAllAppointments();
        // Enviando a lista de agendamentos como resposta
        res.send(appointments);
    } catch (error) {
        // Em caso de erro, loga o erro e envia uma resposta de erro
        console.log(error);
        res.status(500).send(error);
    }
});

// Rota para obter um agendamento específico pelo ID
router.get('/getAppointment/:id', async (req, res) => {
    const { id } = req.params; // Extraindo o ID da URL
    try {
        // Chamando o serviço para pegar o agendamento com o ID fornecido
        const appointment = await AppointmentService.getAppointment(id);
        // Enviando o agendamento como resposta
        res.send(appointment);
    } catch (error) {
        // Em caso de erro, loga o erro e envia uma resposta de erro
        console.log(error);
        res.status(500).send(error);
    }
});

// Rota para criar um novo agendamento
router.post('/postAppointment', async (req, res) => {
    const { date, doctorId, pacientId } = req.body; // Extraindo os dados do corpo da requisição
    try {
        // Chamando o serviço para salvar o novo agendamento
        const appointment = await AppointmentService.saveAppointment({ date, doctorId, pacientId });
        // Enviando o agendamento criado como resposta
        res.send(appointment);
    } catch (error) {
        // Em caso de erro, loga o erro e envia uma resposta de erro
        console.log(error);
        res.status(500).send(error);
    }
});

// Rota para atualizar um agendamento existente
router.put('/appointments/:id', async (req, res) => {
    const { id } = req.params; // Extraindo o ID da URL
    const { date, doctorId, pacientId } = req.body; // Extraindo os novos dados do corpo da requisição
    try {
        // Chamando o serviço para atualizar o agendamento
        const appointment = await AppointmentService.updateAppointment(id, { date, doctorId, pacientId });
        // Enviando o agendamento atualizado como resposta
        res.send(appointment);
    } catch (error) {
        // Em caso de erro, loga o erro e envia uma resposta de erro
        console.log(error);
        res.status(500).send(error);
    }
});

// Rota para excluir um agendamento pelo ID
router.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params; // Extraindo o ID da URL
    try {
        // Chamando o serviço para excluir o agendamento
        const appointment = await AppointmentService.deleteAppointment(id);
        // Enviando o agendamento excluído como resposta
        res.send(appointment);
    } catch (error) {
        // Em caso de erro, loga o erro e envia uma resposta de erro
        console.log(error);
        res.status(500).send(error);
    }
});

// Rota para reagendar um agendamento existente
router.put('/reschedule/:id', async (req, res) => {
    const { id } = req.params; // Extraindo o ID da URL
    const { date } = req.body; // Extraindo a nova data do corpo da requisição
    try {
        // Buscando o agendamento original pelo ID
        let appointment = await AppointmentService.getAppointment(id);
        // Atualizando a data do agendamento
        appointment.date = date;

        // Chamando o serviço para atualizar o agendamento
        appointment = await AppointmentService.updateAppointment(id, { date });
        // Enviando o agendamento reagendado como resposta
        res.send(appointment);
    } catch (error) {
        // Em caso de erro, loga o erro e envia uma resposta de erro
        console.log(error);
        res.status(500).send(error);
    }
});

// Exportando o roteador para ser usado na aplicação
export default router;
