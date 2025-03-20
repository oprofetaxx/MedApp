import PrescriptionRepository from "../repositories/PrescriptionRepository.js";
import AppointmentService from "./AppointmentService.js";
import DoctorService from "./DoctorService.js";
import PacientService from "./PacientService.js";
import PDFDocument from "pdfkit";
import fs from 'fs';
import path from 'path';

// Função para obter todas as prescrições
const getAllPrescriptions = async () => {
    return PrescriptionRepository.getAllPrescriptions();
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
        return await PrescriptionRepository.updatePrescription(id, { date, appointmentId, medicine, dosage, instructions, file });
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

// Função para gerar um arquivo PDF com a prescrição
const generatePrescriptionFile = async (prescription) => {
    try {
        const appointment = await AppointmentService.getAppointment(prescription.appointmentId);
        const pacient = await PacientService.getPacient(appointment.pacientId);
        const doctor = await DoctorService.getDoctor(appointment.doctorId);

        const id = prescription._id;
        const document = new PDFDocument({ font: 'Courier' });

        // Criando caminho seguro para o arquivo
        const filePath = "./MediApp/prescriptions/" + id + ".pdf";

        // Criando e escrevendo no arquivo PDF
        document.pipe(fs.createWriteStream(filePath));
        document.fontSize(16).text("Pacient Name: " + pacient.name);
        document.fontSize(14).text("Doctor Name: " + doctor.name);
        document.fontSize(12).text("Medicine: " + prescription.medicine);
        document.fontSize(12).text("Dosage: " + prescription.dosage);
        document.fontSize(12).text("Instructions: " + prescription.instructions);

        document.end();

        return filePath;
    } catch (error) {
        console.error("Erro ao gerar o arquivo de prescrição:", error);
        throw new Error("Failed to generate prescription file");
    }
}

// Exportando todas as funções corretamente
const PrescriptionService = {
    getAllPrescriptions,
    getPrescription,
    savePrescription,
    updatePrescription,
    deletePrescription,
    generatePrescriptionFile
}

export default PrescriptionService;
