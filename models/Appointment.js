import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,  // Assume que o doctorId é um ObjectId
        ref: "Doctor",  // Relacionamento com o modelo Doctor
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,  // Assume que o patientId é um ObjectId
        ref: "Patient",  // Relacionamento com o modelo Patient
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,  // ou Date, dependendo de como você quer armazenar o horário
        required: true
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
