import express from "express";
import doctorRoutes from "./routes/DoctorController.js";
import appointmentRoutes from "./routes/AppointmentController.js";
import pacientRoutes from "./routes/PacientController.js";
import db from "./database/database.js";
import prescriptionRoutes from "./routes/PrescriptionController.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/doctor", doctorRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/pacient", pacientRoutes);
app.use("/prescriptions", prescriptionRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
