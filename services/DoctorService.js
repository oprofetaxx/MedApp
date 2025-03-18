import Doctor from "../models/Doctor.js";  // Certifique-se de importar o modelo correto

const saveDoctor = async (doctorData) => {
  return await Doctor.create(doctorData);
};

const getDoctor = async (id) => {
  return await Doctor.findById(id);
};

const getAllDoctors = async () => {
  return await Doctor.find();
};

const updateDoctor = async (id, doctorData) => {
  return await Doctor.findByIdAndUpdate(id, doctorData, { new: true });
};

// Deletar médico pelo ID
const deleteDoctor = async (id) => {
  console.log("Tentando deletar ID:", id); // 🛠️ Debug
  return await Doctor.findByIdAndDelete(id); // Alterado para usar o modelo diretamente
};


//login
const getDoctorByLogin = async (login) => {

  return await DoctorRepository.getDoctorByLogin( login );
};

const DoctorService = {
  saveDoctor,
  getDoctor,
  getAllDoctors,
  updateDoctor,
  deleteDoctor, 
  getDoctorByLogin
};

export default DoctorService;
