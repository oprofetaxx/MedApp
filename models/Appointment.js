import mongoose from 'mongoose';
import Doctor from './Doctor.js';   // Ajuste o caminho conforme necessário
import Pacient from './Pacient.js'; // Ajuste o caminho conforme necessário

const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",  
        required: [true, "Doctor ID is required."],
        validate: {
            validator: async function(v) {
                const id = new mongoose.Types.ObjectId(v);
                return await Doctor.exists({ _id: id });
            },
            message: props => `DoctorID ${props.value} not found.` // Adicionando a mensagem correta
        }
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pacient",  
        required: [true, "Pacient ID is required."],
        validate: {
            validator: async function(v) {
                const id = new mongoose.Types.ObjectId(v);
                return await Pacient.exists({ _id: id });
            },
            message: props => `PacientID ${props.value} not found.` // Corrigido "Props.value" para "props.value"
        }
    },
    date: {
        type: Date,
        required: [true, "Date is required."]
    },
    time: {
        type: String,
        required: [true, "Appointment time is required."]
    }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
