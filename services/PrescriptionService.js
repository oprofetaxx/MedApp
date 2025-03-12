import PrescriptionRepository from "../repositories/PrescriptionRepository.js"; 

// Função para obter todas as prescrições
const getAllPrescriptions = async () => {
    return PrescriptionRepository.getAllPrescriptions();  // Certifique-se de que isso retorna corretamente as prescrições
}

// Função para obter uma prescrição específica pelo ID
const getPrescription = async (id) => {
    return PrescriptionRepository.getPrescription(id);
}

// Função para salvar uma nova prescrição
const savePrescription = async ({ date, appointmentId, medicine, dosage, instructions }) => {
    if (!date || !appointmentId || !medicine || !dosage || !instructions) {
        throw new Error("Missing required fields: date, appointmentId, medicine, dosage, instructions.");
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date format");
    }

    try {
        return await PrescriptionRepository.savePrescription({ date, appointmentId, medicine, dosage, instructions });
    } catch (error) {
        console.log("Erro ao salvar prescrição no repositório:", error);
        throw new Error("Failed to save prescription");
    }
}


// Função para atualizar uma prescrição
const updatePrescription = async (id, { date, appointmentId, medicine, dosage, instructions }) => {
    if (!date || !appointmentId || !medicine || !dosage || !instructions) {
        throw new Error("Missing required fields: date, appointmentId, medicine, dosage, instructions.");
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date format");
    }

    try {
        return await PrescriptionRepository.updatePrescription(id, { date, appointmentId, medicine, dosage, instructions });
    } catch (error) {
        console.log("Erro ao atualizar prescrição:", error);
        throw new Error("Failed to update prescription");
    }

    
}

// Função para deletar uma prescrição
const deletePrescription = async (id) => {
    const prescription = await PrescriptionRepository.getPrescription(id);
    if (!prescription) {
        throw new Error("Prescription not found");
    }
    return PrescriptionRepository.deletePrescription(id);
}


// Exportando todas as funções corretamente
const PrescriptionService = {
    getAllPrescriptions,
    getPrescription,
    savePrescription,
    updatePrescription,
    deletePrescription
}

export default PrescriptionService;
