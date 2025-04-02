// Importando express para criar rotas e bcrypt para criptografar senhas
import express from "express";
import bcrypt from 'bcrypt';
import DoctorService from "../services/DoctorService.js";

// Criando o roteador para a API de médicos
let router = express.Router();

// Rota para obter todos os médicos
router.get('/doctors', async (req, res) => {
    try {
        // Chamando o serviço para pegar todos os médicos
        const doctors = await DoctorService.getAllDoctors();
        // Enviando a lista de médicos como resposta
        res.send(doctors);
    } catch (error) {
        // Em caso de erro, loga o erro e envia uma resposta de erro
        console.error(error);
        res.status(500).send(error);
    }
});

// Rota para obter um médico específico pelo ID
router.get('/getDoctor/:id', async (req, res) => {
    const { id } = req.params; // Extraindo o ID da URL
    try {
        // Chamando o serviço para pegar o médico com o ID fornecido
        const doctor = await DoctorService.getDoctor(id);
        // Enviando o médico como resposta
        res.send(doctor);
    } catch (error) {
        // Em caso de erro, loga o erro e envia uma resposta de erro
        console.error(error);
        res.status(500).send(error);
    }
});

// Rota para criar um novo médico
router.post("/postDoctor", async function(req, res) {
    const { name, login, password, medicalSpecialty, medicalRegistration, email, phone } = req.body; // Extraindo os dados do corpo da requisição
    try {
        // Criptografando a senha do médico antes de armazená-la
        const hashedPassword = await bcrypt.hash(password, 10);
        // Chamando o serviço para salvar o novo médico
        const doctor = await DoctorService.saveDoctor({ 
            name, 
            login, 
            password: hashedPassword, 
            medicalSpecialty, 
            medicalRegistration, 
            email, 
            phone 
        });
        // Enviando o médico criado como resposta
        res.status(201).send(doctor);
    } catch (error) {
        // Em caso de erro, loga o erro e envia uma resposta de erro
        console.error(error);
        res.status(500).send("Falha ao registrar médico" + error);
    }
});

// Rota para atualizar um médico existente
router.put('/doctors/:id', async (req, res) => {
    const { id } = req.params; // Extraindo o ID da URL
    const { name, login, password, medicalSpecialty, medicalRegistration, email, phone } = req.body; // Extraindo os novos dados do corpo da requisição

    try {
        // Chamando o serviço para atualizar os dados do médico
        const doctor = await DoctorService.updateDoctor(id, { name, login, password, medicalSpecialty, medicalRegistration, email, phone });
        // Enviando o médico atualizado como resposta
        res.send(doctor);
    } catch (error) {
        // Em caso de erro, loga o erro e envia uma resposta de erro
        console.error(error);
        res.status(500).send(error);
    }
});

// Rota para excluir um médico pelo ID
router.delete('/doctors/:id', async (req, res) => {
    const { id } = req.params; // Extraindo o ID da URL

    try {
        // Chamando o serviço para excluir o médico
        const doctor = await DoctorService.deleteDoctor(id);
        // Enviando o médico excluído como resposta
        res.send(doctor);
    } catch (error) {
        // Em caso de erro, loga o erro e envia uma resposta de erro
        console.error(error);
        res.status(500).send(error);
    }
});

// Exportando o roteador para ser usado na aplicação
export default router;
