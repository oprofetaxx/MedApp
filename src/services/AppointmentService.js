import AppointmentRepository from "../repositories/AppointmentRepository.js";

const getAllAppointments = async() => {
    return await AppointmentRepository.getAllAppointments();
}

const getAppointment = async(id) => {
    return await AppointmentRepository.getAppointment(id);
}

const saveAppointment = async({ date, doctorId, patientId, time }) => {
    console.log("Dados recebidos para salvar o agendamento:", { date, doctorId, patientId, time });
    // Salve o agendamento no banco de dados aqui
    const appointment = await AppointmentRepository.saveAppointment({ date, doctorId, patientId, time });
    console.log("Agendamento criado no banco:", appointment);
    return appointment;
};

const updateAppointment = async(id, {date, doctorId, pacientId}) => {
    return await AppointmentRepository.updateAppointment(id, {date, doctorId, pacientId});
}

const deleteAppointment = async(id) => {
    return await AppointmentRepository.deleteAppointment(id);
}

const appointmentService = {
    getAllAppointments,
    getAppointment,
    saveAppointment,
    updateAppointment,
    deleteAppointment
}

export default appointmentService;
