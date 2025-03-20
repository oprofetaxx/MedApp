import express from "express";
import PrescriptionService from "../services/PrescriptionService.js"; 
import multer from "multer";
import path from "path";    
import process from "process";


const router = express.Router(); 

const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, './MedApp/prescriptions');
    },
    filename: function( req, file, cb){
        cb(null, file.originalname);

    }
});

const upload = multer({storage: storage});

router.post(
    "/uploadPrescription/:id", upload.single('file'), async (req, res) => {

        try {
            const {ìd} = req.params;
            let prescription = await PrescriptionService.getPrescription(id);

            const file = "./MedApp/prescriptions/" + req.file.originalname;

            prescription = await PrescriptionService.updatePrescription(id, {file});

            return res.status(200).send(prescription); 
            
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
            
        }
    
    }
    
);

router.get("/readPrescription/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const prescription = await PrescriptionService.getPrescription(id);
        let filePath = path.resolve(process.cwd() + "/../ " + prescription.file);
        res.status(200).sendFile(filePath);
        
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
        
    }
})



// Rota para obter todas as prescrições
router.get("/prescriptions", async (req, res) => {
    try {
        const prescriptions = await PrescriptionService.getAllPrescriptions();
        res.status(200).json(prescriptions);
    } catch (error) {
        console.log("Erro ao buscar prescrições:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Rota para obter uma prescrição específica pelo ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const prescription = await PrescriptionService.getPrescription(id);
        if (!prescription) {
            return res.status(404).json({ message: "Prescription not found" });
        }
        res.status(200).json(prescription);
    } catch (error) {
        console.log("Erro ao buscar prescrição:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Rota para criar uma nova prescrição
router.post("/", async (req, res) => {
    const { date, appointmentId, medicine, dosage, instructions } = req.body;
    if (!date || !appointmentId || !medicine || !dosage || !instructions) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
    }

    try {
        const prescription = await PrescriptionService.savePrescription({ date, appointmentId, medicine, dosage, instructions });
        res.status(201).json(prescription);
    } catch (error) {
        console.log("Erro ao salvar prescrição:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Rota para atualizar uma prescrição
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { date, appointmentId, medicine, dosage, instructions } = req.body;

    if (!date || !appointmentId || !medicine || !dosage || !instructions) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const prescription = await PrescriptionService.updatePrescription(id, {
            date,
            appointmentId,
            medicine,
            dosage,
            instructions
        });

        if (!prescription) {
            return res.status(404).json({ message: "Prescription not found" });
        }

        res.status(200).json(prescription);
    } catch (error) {
        console.error("Erro ao atualizar prescrição:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Rota para deletar uma prescrição
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await PrescriptionService.deletePrescription(id);
        res.status(200).json({ message: "Prescription deleted successfully" });
    } catch (error) {
        console.log("Erro ao deletar prescrição:", error);
        if (error.message === "Prescription not found") {
            return res.status(404).json({ message: "Prescription not found" });
        }
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Rota para gerar uma prescrição em arquivo
router.get('/generatePrescription/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const prescription = await PrescriptionService.getPrescription(id);
        if (!prescription) {
            return res.status(404).json({ message: "Prescription not found" });
        }

        const generatedPrescription = await PrescriptionService.generatePrescriptionFile(prescription);
        res.status(200).json({ file: generatedPrescription });

    } catch (error) {
        console.error("Erro ao gerar prescrição:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});



export default router;
