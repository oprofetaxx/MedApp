import express from "express";
import DoctorService from "../services/DoctorService.js";

let router = express.Router();

//  Criar um novo médico (POST)
router.post('/postDoctor', async (req, res) => {
  const { name, login, password, medicalSpecialty, medicalRegistration, email, phone } = req.body;
  console.log("Dados recebidos:", req.body);

  if (!name || !login || !password || !medicalSpecialty || !medicalRegistration || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const doctor = await DoctorService.saveDoctor({
      name,
      login,
      password,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone
    });
    res.status(201).json(doctor);
  } catch (error) {
    console.log("Erro ao salvar médico:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

//  Obter todos os médicos (GET ALL)
router.get('/', async (req, res) => {
    try {
        const doctors = await DoctorService.getAllDoctors();
        res.status(200).json(doctors);
    } catch (error) { 
        console.log("Erro ao obter médicos:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

//  Obter um médico específico pelo ID (GET)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await DoctorService.getDoctor(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.log("Erro ao buscar médico:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

//  Atualizar um médico existente (PUT)
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, login, password, medicalSpecialty, medicalRegistration, email, phone } = req.body;

    if (!name || !login || !password || !medicalSpecialty || !medicalRegistration || !email || !phone) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try { 
        const doctor = await DoctorService.updateDoctor(id, {
            name,
            login,
            password,
            medicalSpecialty,
            medicalRegistration,
            email,
            phone
        });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json(doctor);
    } catch (error) {
        console.error("Erro ao atualizar médico:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

//  Deletar um médico pelo ID (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deletedDoctor = await DoctorService.deleteDoctor(id);
      if (!deletedDoctor) {
          return res.status(404).json({ message: "Doctor not found" });
      }
      res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
      console.log("Erro ao deletar médico:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});



export default router;
