import mongoose from "mongoose";

const pacientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: [true, 'Patient birth date is required'],  // Verifique se o campo está corretamente marcado como required
    },
    contactInfo: {
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        }
    },
});

const Pacient = mongoose.model("Pacient", pacientSchema);

export default Pacient;
