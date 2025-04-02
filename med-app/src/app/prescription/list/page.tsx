"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { jsPDF } from "jspdf";

interface Prescription {
  _id: string;
  date: string;
  medicine: string;
  dosage: string;
  instructions: string;
  file?: string;
}

export default function PrescriptionListAndCreate() {
  const router = useRouter();

  // Estados para gerenciamento das prescrições e upload
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<Blob | null>(null);
  const [error, setError] = useState<string | unknown>("");

  // Função para buscar as prescrições
  const fetchPrescriptions = async () => {
    setLoading(true);
    setError(""); // Limpar erro anterior
    try {
      const response = await fetch("http://localhost:3001/prescriptions/allprescription", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
      });
      if (!response.ok) throw new Error("Erro ao buscar prescrições.");
      const data = await response.json();
      setPrescriptions(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao carregar prescrições.");
    } finally {
      setLoading(false);
    }
  };

  // Função para gerar e baixar um PDF com a prescrição
  const generateAndDownloadPDF = (prescription: Prescription) => {
    const doc = new jsPDF();

    // Adicionando o conteúdo da prescrição no PDF
    doc.text(`Prescrição Médica - ${prescription.date}`, 10, 10);
    doc.text(`Medicamento: ${prescription.medicine}`, 10, 20);
    doc.text(`Dosagem: ${prescription.dosage}`, 10, 30);
    doc.text(`Instruções: ${prescription.instructions}`, 10, 40);

    // Baixar o PDF automaticamente
    doc.save(`${prescription._id}_prescricao.pdf`);
  };

  // Função para excluir a prescrição
  const deletePrescription = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/prescriptions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
      });
      if (!response.ok) throw new Error("Erro ao excluir prescrição.");
      setPrescriptions((prevPrescriptions) =>
        prevPrescriptions.filter((prescription) => prescription._id !== id)
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao excluir prescrição.");
    }
  };

  // useEffect para carregar as prescrições quando o componente for montado
  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <>
      <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/home">
        Voltar
      </Link>

      {loading && <p>Carregando...</p>}
      {error && <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400">{error}</div>}

      <table className="table-auto w-full">
        <thead>
          <tr>
            <td className="border border-slate-300">Data</td>
            <td className="border border-slate-300">Medicamento</td>
            <td className="border border-slate-300">Dosagem</td>
            <td className="border border-slate-300">Instruções</td>
            <td className="border border-slate-300">Ações</td>
          </tr>
        </thead>

        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription._id}>
              <td className="border border-slate-300">{prescription.date}</td>
              <td className="border border-slate-300">{prescription.medicine}</td>
              <td className="border border-slate-300">{prescription.dosage}</td>
              <td className="border border-slate-300">{prescription.instructions}</td>

              <td className="border border-slate-300">
                <button
                  onClick={() => generateAndDownloadPDF(prescription)}
                  className="bg-blue-500 p-2 text-white text-sm ml-2"
                >
                  Baixar PDF
                </button>

                <button
                  onClick={() => deletePrescription(prescription._id)}
                  className="bg-red-500 p-2 text-white rounded-sm ml-2"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
