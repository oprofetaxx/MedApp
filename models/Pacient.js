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
            required: [true, 'phone number is required.'],
            validate:{
                validator: function(v){
                    return /\d{2} 9\d{4}-\d{4}/.test(v);
                },
                message:props => `${props.value} this is not phone value.please use the following format 9 9999-9999`
                
            }
        }
    },
});

const Pacient = mongoose.model("Pacient", pacientSchema);

export default Pacient;
