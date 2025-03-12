import Doctor from "../models/Doctor.js";

// Função para obter todos os médicos
const getAllDoctors = async () => {
  try {
    return await Doctor.find();
  } catch (error) {
    throw new Error(`Erro ao obter médicos: ${error.message}`);
  }
};

// Função para obter um médico pelo ID
const getDoctor = async (id) => {
  try {
    return await Doctor.findById(id);
  } catch (error) {
    throw new Error(`Erro ao obter médico: ${error.message}`);
  }
};

// Função para salvar um novo médico
const saveDoctor = async ({ name, login, password, medicalSpecialty, medicalRegistration, email, phone }) => {
  try {
    // Cria um novo médico passando todos os campos obrigatórios
    const newDoctor = new Doctor({ 
      name, 
      login, 
      password, 
      medicalSpecialty, 
      medicalRegistration, 
      email, 
      phone 
    });
    return await newDoctor.save();
  } catch (error) {
    throw new Error(`Erro ao salvar médico: ${error.message}`);
  }
};

// Função para atualizar um médico existente
const updateDoctor = async (id, { name, login, password, medicalSpecialty, medicalRegistration, email, phone }) => {
  try {
    return await Doctor.findByIdAndUpdate(
      id,
      { name, login, password, medicalSpecialty, medicalRegistration, email, phone },
      { new: true }
    );
  } catch (error) {
    throw new Error(`Erro ao atualizar médico: ${error.message}`);
  }
};

// Função para deletar um médico
const deleteDoctor = async (id) => {
  try {
    return await Doctor.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Erro ao deletar médico: ${error.message}`);
  }
};

export default {
  getAllDoctors,
  getDoctor,
  saveDoctor,
  updateDoctor,
  deleteDoctor
};
