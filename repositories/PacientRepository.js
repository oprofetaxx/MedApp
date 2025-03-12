import Pacient from "../models/Pacient.js";  // Importe o modelo de Pacient (certifique-se que o modelo existe)

// Função para obter todos os pacientes
const getAllPacients = async () => {
    try {
        return await Pacient.find();  // Retorna todos os pacientes
    } catch (error) {
        throw new Error(`Erro ao obter pacientes: ${error.message}`);
    }
};

// Função para obter um paciente específico pelo ID
const getPacient = async (id) => {
    try {
        return await Pacient.findById(id);  // Encontra um paciente pelo ID
    } catch (error) {
        throw new Error(`Erro ao obter paciente: ${error.message}`);
    }
};

// Função para salvar um novo paciente
const savePacient = async ({ name, birthDate, contactInfo }) => {
    try {
        const pacient = new Pacient({ name, birthDate, contactInfo });  // Cria uma nova instância de paciente
        return await pacient.save();  // Salva o paciente no banco de dados
    } catch (error) {
        throw new Error(`Erro ao salvar paciente: ${error.message}`);
    }
};

// Função para atualizar um paciente
const updatePacient = async (id, { name, birthDate, contactInfo }) => {
    try {
        // Atualiza o paciente pelo ID
        const updatedPacient = await Pacient.findByIdAndUpdate(
            id,
            { name, birthDate, contactInfo },  // Dados a serem atualizados
            { new: true }  // Retorna o documento atualizado
        );

        // Verifica se o paciente foi encontrado
        if (!updatedPacient) {
            throw new Error("Paciente não encontrado");
        }

        return updatedPacient;
    } catch (error) {
        throw new Error(`Erro ao atualizar paciente: ${error.message}`);
    }
};

// Função para deletar um paciente
const deletePacient = async (id) => {
    try {
        return await Pacient.findByIdAndDelete(id);  // Deleta o paciente pelo ID
    } catch (error) {
        throw new Error(`Erro ao deletar paciente: ${error.message}`);
    }
};

export default {
    getAllPacients,
    getPacient,
    savePacient,
    updatePacient,
    deletePacient
};
