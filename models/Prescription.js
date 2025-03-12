import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',  // Se você tiver um modelo Appointment
        required: true
    },
    medicine: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    }
}, { timestamps: true });  // Cria campos createdAt e updatedAt automaticamente

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
