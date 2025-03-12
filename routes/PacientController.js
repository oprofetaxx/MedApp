import express from "express";
import PacientService from "../services/PacientService.js"; // Importando o serviço de paciente

const router = express.Router(); // Definindo o router corretamente

// Rota para criar um novo paciente
router.post('/', async (req, res) => {  
    const { name, birthDate, email, phone } = req.body;

    if (!name || !birthDate || !email || !phone) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
        // Certifique-se de que o birthDate seja um objeto Date
        const formattedBirthDate = new Date(birthDate);

        // Verifique se a data foi convertida corretamente
        if (isNaN(formattedBirthDate.getTime())) {
            return res.status(400).json({ message: "Data de nascimento inválida" });
        }

        // Chama o serviço para salvar o paciente
        const pacient = await PacientService.savePacient({
            name,
            birthDate: formattedBirthDate,  // Envia o birthDate como um Date
            contactInfo: { email, phone }
        });

        // Retorna o paciente criado com status 201
        res.status(201).json(pacient);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao salvar o paciente", error: error.message });
    }
});

// Rota para obter todos os pacientes
router.get('/', async (req, res) => {
    try {
        // Chama o serviço para obter todos os pacientes
        const pacients = await PacientService.getAllPacients();

        // Retorna os pacientes com status 200
        res.status(200).json(pacients);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao obter pacientes", error: error.message });
    }
});

// Rota para obter um paciente pelo ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;  // Pega o ID da URL

    try {
        // Chama o serviço para obter o paciente pelo ID
        const pacient = await PacientService.getPacient(id);  

        if (!pacient) {
            return res.status(404).json({ message: "Paciente não encontrado" });
        }

        // Retorna o paciente encontrado com status 200
        res.status(200).json(pacient);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao obter o paciente", error: error.message });
    }
});

// Rota para atualizar um paciente
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;  // Pega o ID do paciente da URL
    const { name, birthDate, email, phone } = req.body;  // Pega os dados para atualização

    // Verifique se os campos obrigatórios estão presentes
    if (!name || !birthDate || !email || !phone) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
        // Certifique-se de que a data de nascimento seja um objeto Date
        const formattedBirthDate = new Date(birthDate);

        // Verifique se a data foi convertida corretamente
        if (isNaN(formattedBirthDate.getTime())) {
            return res.status(400).json({ message: "Data de nascimento inválida" });
        }

        // Chama o serviço para atualizar o paciente
        const updatedPacient = await PacientService.updatePacient(id, {
            name,
            birthDate: formattedBirthDate,  // Envia a data de nascimento como Date
            contactInfo: { email, phone }
        });

        if (!updatedPacient) {
            return res.status(404).json({ message: "Paciente não encontrado" });
        }

        // Retorna o paciente atualizado com status 200
        res.status(200).json(updatedPacient);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao atualizar paciente", error: error.message });
    }
});

// Rota para deletar um paciente pelo ID (DELETE)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPacient = await PacientService.deletePacient(id);  // Chama o serviço de deleção
        if (!deletedPacient) {
            return res.status(404).json({ message: "Paciente não encontrado" });
        }
        res.status(200).json({ message: "Paciente deletado com sucesso" });
    } catch (error) {
        console.log("Erro ao deletar paciente:", error);
        res.status(500).json({ message: "Erro ao deletar paciente", error: error.message });
    }
});



export default router;
