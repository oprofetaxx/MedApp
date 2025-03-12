import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


    
    const doctorSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        login: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        medicalSpecialty: {
            type: String,
            required: true
        },
        medicalRegistration: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    });

    // Antes de salvar, criptografa a senha
doctorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); // Se a senha não foi modificada, não faz nada
    }

    try {
        const salt = await bcrypt.genSalt(10); // Gera o salt (valor aleatório)
        this.password = await bcrypt.hash(this.password, salt); // Criptografa a senha
        next(); // Prossegue com o salvamento
    } catch (error) {
        return next(error); // Se der erro, passa para o próximo
    }
});

// Método para comparar a senha fornecida com o hash armazenado
doctorSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); // Compara a senha fornecida com o hash armazenado
};



    
    const Doctor = mongoose.model("Doctor", doctorSchema);
    export default Doctor;
    