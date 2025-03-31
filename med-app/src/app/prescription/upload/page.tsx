"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Definição da interface para os dados da prescrição
interface Prescription {
  _id: string;
  date: string;
  medicine: string;
  dosage: string;
  instructions: string;
  file?: string; // O arquivo pode ser opcional
}

export default function PrescriptionCreate() {
  const router = useRouter();

  // Estado para armazenar as prescrições, estado de carregamento e erro
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Controle de carregamento
  const [file, setFile] = useState<Blob | null>(null); // Armazena o arquivo selecionado para upload
  const [error, setError] = useState<string | unknown>(""); // Armazena mensagens de erro
  const [successMessage, setSuccessMessage] = useState<string>(""); // Armazena mensagens de sucesso

  // URL da API, pode ser configurada para diferentes ambientes
  const API_URL = "http://localhost:3001";

  // useEffect para buscar as prescrições ao carregar o componente
  useEffect(() => {
    setLoading(true); // Ativa o carregamento
    fetch(`${API_URL}/prescriptions/getPrescription/67e720289be0446a55a89f98`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "", // Autenticação do usuário
      },
    })
      .then((response) => response.json()) // Converte a resposta para JSON
      .then((data) => {
        setPrescriptions(data); // Armazena as prescrições no estado
      })
      .catch((error) => setError(error)) // Em caso de erro, define a mensagem de erro
      .finally(() => setLoading(false)); // Finaliza o carregamento
  }, []);

  // Função para enviar o arquivo da prescrição ao servidor
  const uploadPrescription = async (id: string) => {
    if (!file) return; // Verifica se um arquivo foi selecionado

    try {
      // Envia o arquivo para o servidor
      const res = await fetch(`${API_URL}/prescriptions/postPrescription`, {
        method: "POST",
        headers: {
          "Authorization": sessionStorage.getItem("token") || "",
        },
        body: file, // Arquivo enviado no corpo da requisição
      });

      if (!res.ok) throw new Error(await res.text()); // Se não for OK, lança erro
      setSuccessMessage("Prescrição enviada com sucesso!"); // Mensagem de sucesso
      router.push("/prescription/upload"); // Redireciona após sucesso
    } catch (error) {
      setError(error); // Se ocorrer um erro, exibe a mensagem
    }
  };

  // Função para visualizar o arquivo da prescrição
  const showFile = async (id: string) => {
    try {
      // Solicita o arquivo da prescrição do servidor
      const res = await fetch(`${API_URL}/prescriptions/prescriptions/UP`, {
        method: "PUT",
        headers: {
          "Authorization": sessionStorage.getItem("token") || "",
        },
      });

      const blob = await res.blob(); // Obtém o arquivo como Blob
      const url = window.URL.createObjectURL(blob); // Cria um URL para o Blob
      const link = document.createElement("a"); // Cria um link para download
      link.href = url;
      link.download = `${id}.pdf`; // Nome do arquivo a ser baixado
      link.click(); // Simula o clique para fazer o download

      if (!res.ok) throw new Error(await res.text()); // Se não for OK, lança erro
    } catch (error) {
      setError(error); // Se ocorrer um erro, exibe a mensagem
    }
  };

  // Função para gerar uma nova prescrição
  const generatePrescription = async (id: string) => {
    try {
      // Solicita a geração de uma prescrição no servidor
      const res = await fetch(`${API_URL}/prescriptions/prescriptions/DEL`, {
        method: "DELETE",
        headers: {
          "Authorization": sessionStorage.getItem("token") || "",
        },
      });

      if (!res.ok) throw new Error(await res.text()); // Se não for OK, lança erro

      const content = await res.json(); // Converte a resposta para JSON

      if (content._id) {
        // Se a prescrição foi gerada com sucesso, exibe uma mensagem
        setSuccessMessage("Nova prescrição gerada com sucesso!");
        window.location.reload(); // Recarrega a página para refletir a mudança
      } else {
        setError(content.error); // Exibe erro se não houver _id
      }
    } catch (error) {
      setError(error); // Se ocorrer um erro, exibe a mensagem
    }
  };

  return (
    <>
      {/* Link para voltar à página inicial */}
      <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/home">
        Voltar
      </Link>
      
      {/* Exibe o estado de carregamento enquanto as prescrições estão sendo buscadas */}
      {loading && <p>Carregando...</p>}

      {/* Exibe a mensagem de erro, se houver */}
      {error && (
        <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400">
          {error}
        </div>
      )}

      {/* Exibe a mensagem de sucesso, se houver */}
      {successMessage && (
        <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
          {successMessage}
        </div>
      )}

      {/* Tabela com as prescrições */}
      <table>
        <thead>
          <tr>
            <td className="border border-slate-300">Data</td>
            <td className="border border-slate-300 text-center">Medicamento</td>
            <td className="border border-slate-300 text-center">Dosagem</td>
            <td className="border border-slate-300 text-center">Instruções</td>
          </tr>
        </thead>

        <tbody>
          {/* Mapeia e exibe as prescrições */}
          {prescriptions.map((prescription) => (
            <tr key={prescription._id}>
              <td className="border border-slate-300">{prescription.date}</td>
              <td className="border border-slate-300 text-center">{prescription.medicine}</td>
              <td className="border border-slate-300 text-center">{prescription.dosage}</td>
              <td className="border border-slate-300 text-center">{prescription.instructions}</td>

              {/* Se a prescrição não tem arquivo, exibe os botões para upload ou geração */}
              {!prescription.file && (
                <td className="border border-slate-300 text-center">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)} // Seleciona o arquivo para upload
                  />
                </td>
              )}
              {!prescription.file && (
                <td className="border border-slate-300 text-center">
                  <button
                    onClick={() => uploadPrescription(prescription._id)} // Função de upload
                    className="bg-orange-500 p-2 inline-block text-white text-sm"
                  >
                    Upload
                  </button>
                </td>
              )}
              {!prescription.file && (
                <td className="border border-slate-300 text-center">
                  <button
                    onClick={() => generatePrescription(prescription._id)} // Função para gerar a prescrição
                    className="bg-orange-500 p-2 inline-block text-white text-sm"
                  >
                    Gerar Prescrição
                  </button>
                </td>
              )}

              {/* Se a prescrição já tem um arquivo, exibe o botão para visualizar */}
              {prescription.file && (
                <td className="border border-slate-300 text-center">
                  <button
                    onClick={() => showFile(prescription._id)} // Função para visualizar o arquivo
                    className="bg-green-500 p-2 inline-block text-white text-sm"
                  >
                    Ver Arquivo
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
