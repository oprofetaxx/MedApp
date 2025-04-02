import express from "express";
import PrescriptionService from "../services/PrescriptionService.js";
import multer from 'multer';
import process from "process";
import path from "path";
import fs from 'fs';  // Importação do módulo fs para verificar a existência dos arquivos

let router = express.Router();

// Configuração do armazenamento com multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, 'src', 'prescriptions');  // Caminho ajustado para o diretório correto
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);  // Gerando nome único
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Rota para upload de arquivo de prescrição
router.post('/prescriptions/getPrescription/:id', upload.single('file'), async (req, res) => {
  console.log("Arquivo recebido:", req.file);
  try {
    const { id } = req.params;
    let prescription = await PrescriptionService.getPrescription(id);
    
    if (!prescription) {
      return res.status(404).send({ message: 'Prescrição não encontrada' });
    }

    // Atualiza a prescrição com o caminho do arquivo
    const filePath = path.join(__dirname, '..', 'prescriptions', req.file.filename);

    prescription = await PrescriptionService.updatePrescription(id, { file: filePath });

    return res.status(200).send(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao processar o upload da prescrição', error });
  }
});

// Rota para ler e baixar a prescrição
router.get('/prescriptions/readPrescription/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await PrescriptionService.getPrescription(id);
    const filePath = path.resolve(process.cwd(), 'MediApp', 'prescriptions', prescription.file);

    // Verifica se o arquivo existe antes de enviar
    if (fs.existsSync(filePath)) {
      res.status(200).sendFile(filePath);  // Envia o arquivo para download
    } else {
      res.status(404).send({ message: 'Arquivo não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Rota para gerar um arquivo de prescrição PDF
router.get('/prescriptions/file/:id', async(req, res) => {
  const { id } = req.params;
  try {
    const prescription = await PrescriptionService.getPrescription(id);
    
    // Suponha que o método generatePrescriptionFile retorne um caminho para o PDF gerado
    const generatedFilePath = await PrescriptionService.generatePrescriptionFile(prescription);

    if (generatedFilePath) {
      // Enviar o arquivo gerado para o cliente
      res.status(200).sendFile(generatedFilePath, (err) => {
        if (err) {
          res.status(500).send({ message: 'Erro ao enviar o arquivo', error: err });
        }
      });
    } else {
      res.status(404).send({ message: 'Arquivo de prescrição não gerado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Rota para obter todas as prescrições
router.get('/allprescription', async (req, res) => {
  try {
    const prescriptions = await PrescriptionService.getAllPrescriptions();
    res.send(prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Rota para obter uma prescrição específica por ID
router.get('/getPrescription/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await PrescriptionService.getPrescription(id);
    res.send(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Rota para criar uma nova prescrição
router.post("/postPrescription", async function(req, res) {
  const { date, appointmentId, medicine, dosage, instructions } = req.body;
  try {
    const prescription = await PrescriptionService.savePrescription({ date, appointmentId, medicine, dosage, instructions });
    res.status(201).send(prescription);  // Status 201 para indicar que foi criada
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Rota para atualizar uma prescrição existente
router.put('/prescriptions/:id', async (req, res) => {
  const { id } = req.params;
  const { date, appointmentId, medicine, dosage, instructions } = req.body;

  try {
    const prescription = await PrescriptionService.updatePrescription(id, { date, appointmentId, medicine, dosage, instructions });
    res.send(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Rota para excluir uma prescrição
router.delete('/prescriptions/:id', async (req, res) => {
  const { id } = req.params;  // O ID vem da URL, então deve ser acessado via req.params

  try {
    const prescription = await PrescriptionService.deletePrescription(id);
    res.status(200).send({ message: 'Prescrição excluída com sucesso', prescription });  // Retorna a prescrição excluída ou mensagem de sucesso
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao excluir a prescrição' });
  }
});

export default router;
