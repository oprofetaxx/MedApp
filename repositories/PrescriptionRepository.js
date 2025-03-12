import Prescription from "../models/Prescription.js"; 

const getAllPrescriptions = async () => {
    return await Prescription.find();  // Recupera todas as prescrições
}

const getPrescription = async (id) => {
    return await Prescription.findById(id);  // Busca a prescrição pelo ID
}

const savePrescription = async ({ date, appointmentId, medicine, dosage, instructions }) => {
    const prescription = new Prescription({
        date,
        appointmentId,
        medicine,
        dosage,
        instructions
    });
    return await prescription.save();  // Salva a prescrição no banco de dados
}

const updatePrescription = async (id, { date, appointmentId, medicine, dosage, instructions }) => {
    return await Prescription.findByIdAndUpdate(id, {
        date,
        appointmentId,
        medicine,
        dosage,
        instructions
    }, { new: true });  // Atualiza a prescrição
}

const deletePrescription = async (id) => {
    return await Prescription.findByIdAndDelete(id);  // Deleta a prescrição
}

const PrescriptionRepository = {
    getAllPrescriptions,
    getPrescription,
    savePrescription,
    updatePrescription,
    deletePrescription
}

export default PrescriptionRepository;
