import express from "express";
import bcrypt from 'bcrypt';
import DoctorService from "../services/DoctorService.js";

let router = express.Router();

// Rota para obter todos os médicos
// GET /api/doctors
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await DoctorService.getAllDoctors();
        res.send(doctors); // Envia a lista de médicos
    } catch (error) {
        console.error(error);
        res.status(500).send(error); // Retorna erro em caso de falha
    }
});

// Rota para obter um médico específico por ID
// GET /api/doctors/getDoctor/:id
router.get('/getDoctor/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const doctor = await DoctorService.getDoctor(id);
      res.send(doctor);
  } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
});

// Rota para registrar um novo médico
// POST /api/doctors/postDoctor
router.post('/doctors/postDoctor', async (req, res) => {
    const { name, login, password, medicalSpecialty, medicalRegistration, email, phone } = req.body;
    try {
        // Criptografa a senha do médico antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10); 
        // Salva o novo médico no banco de dados
        const doctor = await DoctorService.saveDoctor({ name, login, password: hashedPassword, medicalSpecialty, medicalRegistration, email, phone });
        res.status(201).send(doctor); // Retorna o médico criado
    } catch (error) {
        console.error(error);
        res.status(500).send("Falha ao registrar médico" + error); // Retorna erro em caso de falha
    }
});

// Rota para atualizar os dados de um médico
// PUT /api/doctors/:id
router.put('/doctors/:id', async (req, res) => {
  const { id } = req.params; // Pega o id do médico a ser atualizado
  const { name, login, password, medicalSpecialty, medicalRegistration, email, phone } = req.body;

  try {
    // Atualiza o médico com os novos dados fornecidos
    const doctor = await DoctorService.updateDoctor(id, { name, login, password, medicalSpecialty, medicalRegistration, email, phone });
    res.send(doctor); // Retorna o médico atualizado
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // Retorna erro em caso de falha
  }
});

// Rota para excluir um médico
// DELETE /api/doctors/:id
router.delete('/doctors/:id', async (req, res) => {
  const { id } = req.params; // Pega o id do médico a ser excluído

  try {
    // Exclui o médico do banco de dados
    const doctor = await DoctorService.deleteDoctor(id);
    res.send(doctor); // Retorna a confirmação da exclusão
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // Retorna erro em caso de falha
  }
});

export default router;
