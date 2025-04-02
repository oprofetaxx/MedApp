import express from "express";
import PacientService from "../services/PacientService.js";

let router = express.Router();

// Rota para obter todos os pacientes
router.get('/patients', async (req, res) => {
    try {
        const patients = await PacientService.getAllPacients();
        res.send(patients);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Rota para obter um paciente específico pelo ID
router.get('/getPatient/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await PacientService.getPacient(id);
        res.send(patient);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Rota para criar um novo paciente
router.post('/patients', async (req, res) => {
    const { name, birthDate, email, phone } = req.body;
    try {
        const patient = await PacientService.savePacient({ name, birthDate, email, phone });
        res.status(201).send(patient);  // Retorno com status 201 de "Created"
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Rota para atualizar um paciente existente
router.put('/patients/:id', async (req, res) => {
    const { id } = req.params;
    const { name, birthDate, email, phone } = req.body;

    try {
        const patient = await PacientService.updatePacient(id, { name, birthDate, email, phone });
        res.send(patient);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Rota para excluir um paciente pelo ID
router.delete('/patients/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await PacientService.deletePacient(id);
        res.send(patient);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

export default router;
