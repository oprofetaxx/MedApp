import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


    
    const doctorSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Doctor name is required."]
        },
        login: {
            type: String,
            required: [true, "login is required."]
        },
        password: {
            type: String,
            required:[true, "password is required."]
        },
        medicalSpecialty: {
            type: String,
            required: [true, "Medical Specialty is required."]
        },
        medicalRegistration: {
            type: String,
            required: [true, "Medical Registration is required."]
        },
        email: {
            type: String,
            required: [true, "Email contact is required."]
        },
        phone: {
            type: String,
            required: [true, "phone number is required."],
            validate:{
                validator: function(v){
                    return /\d{2} 9\d{4}-\d{4}/.test(v);
                },
                message:props => `${props.value} this is not phone value.please use the following format 9 9999-9999`
                
            }
        }
    });

    // Antes de salvar, criptografa a senha
doctorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); 
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
    