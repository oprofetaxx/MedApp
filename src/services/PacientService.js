import PacientRepository from "../repositories/PacientRepository.js";

// Função para obter todos os pacientes
const getAllPacients = async () => {
    return PacientRepository.getAllPacients();
}

// Função para obter um paciente específico pelo ID
const getPacient = async (id) => {
    return PacientRepository.getPacient(id); // Usar a função do repositório para obter o paciente
}

// Função para salvar um novo paciente
const savePacient = async ({ name, birthDate, contactInfo }) => {
    return PacientRepository.savePacient({ name, birthDate, contactInfo }); // Passar birthDate no lugar de age
}

// Função para atualizar um paciente
const updatePacient = async (id, { name, birthDate, contactInfo }) => {
    return PacientRepository.updatePacient(id, { name, birthDate, contactInfo }); // Atualiza os dados do paciente
}

// Função para deletar um paciente
const deletePacient = async (id) => {
    const pacient = await PacientRepository.getPacient(id);
    if (!pacient) {
        throw new Error("Paciente não encontrado");
    }
    return PacientRepository.deletePacient(id); // Remove o paciente
}




const PacientService = {
    getAllPacients,
    getPacient,
    savePacient,
    updatePacient,
    deletePacient
}

export default PacientService;
