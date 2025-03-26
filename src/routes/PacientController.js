import express from "express";  // Importa o express para criar o roteador de rotas
import PacientService from "../services/PacientService.js";  // Importa o serviço de Pacientes

let router = express.Router();  // Cria o roteador para definir as rotas

// Rota GET para obter todos os pacientes
// URL: /pacient/pacients
router.get('/pacients', async (req, res) => {
  try {
      const pacients = await PacientService.getAllPacients(); // Obtém todos os pacientes
      res.send(pacients); // Retorna a lista de pacientes
  } catch (error) {
      console.error(error);
      res.status(500).send(error); // Retorna erro em caso de falha
  }
});

// Rota GET para obter um paciente específico pelo ID
// URL: /pacient/getPacient/:id
router.get('/getPacient/:id', async (req, res) => {
  const { id } = req.params;  // Extrai o ID dos parâmetros da URL
  try{
    // Chama o serviço para buscar o paciente pelo ID
    const pacient = await PacientService.getPacient(id);
    res.send(pacient);  // Envia os dados do paciente encontrado
  } catch (error){
    console.error(error);
    res.status(500).send(error);  // Retorna erro caso falhe ao buscar o paciente
  }
});

// Rota POST para registrar um novo paciente
// URL: /pacient/postPacient
router.post('/postPacient', async (req, res) => {
  const { name, birthDate, email, phone } = req.body;
  try {
      const pacient = await PacientService.savePacient({ name, birthDate, email, phone });
      res.status(201).send(pacient); // Retorna o paciente criado
  } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao registrar paciente: " + error); // Retorna erro em caso de falha
  }
});

// Rota PUT para atualizar um paciente existente
// URL: /pacient/pacients/:id
router.put('/pacients/:id', async (req, res) => {
  const { id } = req.params; // Pega o id do paciente
  const { name, birthDate, email, phone } = req.body; // Dados a serem atualizados

  try {
      // Chama o serviço para atualizar o paciente
      const pacient = await PacientService.updatePacient(id, { name, birthDate, email, phone });
      res.send(pacient); // Retorna o paciente atualizado
  } catch (error) {
      console.error(error);
      res.status(500).send(error); // Retorna erro em caso de falha
  }
});

// Rota DELETE para excluir um paciente
// URL: /pacient/pacients/:id
router.delete('/pacients/:id', async (req, res) => {
  const { id } = req.params; // Pega o id do paciente a ser excluído

  try {
    const pacient = await PacientService.deletePacient(id); // Chama o serviço para deletar o paciente
    res.send(pacient); // Retorna o paciente deletado ou confirmação
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // Retorna erro em caso de falha
  }
});
export default router;  // Exporta o roteador para ser usado em outros arquivos
