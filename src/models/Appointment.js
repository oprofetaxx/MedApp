import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
