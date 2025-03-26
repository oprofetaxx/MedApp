import Appointment from "../models/Appointment.js";

const getAllAppointments = async () => {
    return await Appointment.find();
}

const getAppointment = async (id) => {
    try {
        return await Appointment.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}

const saveAppointment = async ({ date, doctorId, patientId, time }) => {
    try {
        const doctorExists = await Doctor.exists({ _id: doctorId });
        const patientExists = await Pacient.exists({ _id: patientId });

        console.log(`Doctor exists: ${doctorExists}, Patient exists: ${patientExists}`);

        if (!doctorExists) {
            console.log(`Doctor with ID ${doctorId} not found.`);
            throw new Error(`Doctor with ID ${doctorId} not found.`);
        }

        if (!patientExists) {
            console.log(`Patient with ID ${patientId} not found.`);
            throw new Error(`Patient with ID ${patientId} not found.`);
        }

        const newAppointment = new Appointment({
            doctorId,
            patientId,
            date: new Date(date),  // Converte a data para um formato aceito pelo banco de dados
            time
        });

        const savedAppointment = await newAppointment.save();
        console.log("Agendamento salvo no banco:", savedAppointment);
        return savedAppointment;
    } catch (error) {
        console.error("Erro ao salvar o agendamento:", error);
        throw error;
    }
};

const updateAppointment = async (id, {date, doctorId, pacientId}) => {
    try {
        return await Appointment.findByIdAndUpdate(id, {date, doctorId, pacientId}, {new: true} );
    } catch (error) {
        throw new Error(error);
    }
}

const deleteAppointment = async (id) => {
    try {
        return await Appointment.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

const appointmentRepository = {
    getAllAppointments,
    getAppointment,
    saveAppointment,
    updateAppointment,
    deleteAppointment
}

export default appointmentRepository;