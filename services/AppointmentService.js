import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";

const saveAppointment = async ({ doctorId, patientId, date, time }) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(doctorId) || !mongoose.Types.ObjectId.isValid(patientId)) {
            throw new Error("doctorId ou patientId inválido. Deve ser um ObjectId válido.");
        }

        const newAppointment = new Appointment({
            doctorId: new mongoose.Types.ObjectId(doctorId),
            patientId: new mongoose.Types.ObjectId(patientId),
            date,
            time
        });

        return await newAppointment.save();
    } catch (error) {
        console.error("Erro ao salvar o agendamento:", error.message);
        throw error;
    }
};

//  Função para buscar todos os agendamentos
const getAllAppointments = async () => {
    try {
        return await Appointment.find();
    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error.message);
        throw error;
    }
};

// Função para buscar um agendamento por ID
const getAppointmentById = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID do agendamento inválido.");
        }

        const appointment = await Appointment.findById(id);
        if (!appointment) {
            throw new Error("Agendamento não encontrado.");
        }

        return appointment;
    } catch (error) {
        console.error("Erro ao buscar agendamento:", error.message);
        throw error;
    }
};

// Função para atualizar um agendamento (PUT)
const updateAppointment = async (id, data) => {
    try {
        return await Appointment.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new Error(`Erro ao atualizar agendamento: ${error.message}`);
    }
};

// Função para deletar o agendamento
const deleteAppointment = async (id) => {
    console.log("Tentando deletar consulta com ID:", id);  // 🛠️ Debug
    return Appointment.findByIdAndDelete(id);  // Deleta o agendamento
};

export default {
    saveAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
