"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PrescriptionCreate(params: any) {
  const router = useRouter();

  // Declaração dos estados para gerenciar os dados do formulário e os estados de erro e carregamento
  const [date, setDate] = useState<string>(""); // Estado para a data da prescrição
  const [medicine, setMedicine] = useState<string>(""); // Estado para o medicamento
  const [dosage, setDosage] = useState<string>(""); // Estado para a dosagem
  const [instructions, setInstructions] = useState<string>(""); // Estado para as instruções
  const [error, setError] = useState<string | null>(null); // Estado para erros
  const [loading, setLoading] = useState<boolean>(false); // Estado para controle de carregamento

  // Captura o id da consulta passada como parâmetro para a criação da prescrição
  const appointmentId = params.params.id;

  // Função assíncrona para enviar os dados do formulário e criar uma prescrição
  const addPrescription = async (e: any) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário (recarregar a página)
    setError(null); // Limpa os erros antes de tentar enviar novamente

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!date || !medicine || !dosage) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return; // Se algum campo obrigatório não for preenchido, retorna e não envia a requisição
    }

    setLoading(true); // Ativa o estado de carregamento para desabilitar o botão

    const formData = {
      date: date, // Dados da data
      appointmentId: appointmentId, // Id da consulta
      medicine: medicine, // Nome do medicamento
      dosage: dosage, // Dosagem do medicamento
      instructions: instructions, // Instruções de uso
    };

    try {
      // Envia os dados da prescrição para o servidor
      const add = await fetch("http://localhost:3001/prescriptions/postPrescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "", // Token de autorização do usuário
        },
        body: JSON.stringify(formData), // Corpo da requisição com os dados da prescrição
      });

      const content = await add.json(); // Obtém a resposta da API em formato JSON

      if (content.date) {
        // Se a prescrição foi criada com sucesso, redireciona para a página inicial
        router.push("/home");
      } else {
        // Caso contrário, exibe um erro
        setError(content.error || "Erro ao criar a prescrição");
      }
    } catch (error) {
      // Se houver erro na requisição, define a mensagem de erro
      setError("Ocorreu um erro ao enviar a prescrição.");
    } finally {
      // Após a requisição (independente do sucesso ou falha), desativa o carregamento
      setLoading(false);
    }
  };

  return (
    <>
      {/* Link para voltar à lista de consultas */}
      <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/appointment/list">
        Voltar
      </Link>
      {/* Formulário para criação da prescrição */}
      <form className="w-full" onSubmit={addPrescription}>
        <span className="font-bold text-yellow-500 py-2 block underline text-2xl">Formulário de prescrição</span>

        {/* Campo de data da prescrição */}
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Data da prescrição
          </label>
          <input
            type="date"
            name="date"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: any) => setDate(e.target.value)} // Atualiza o estado de data
            value={date}
          />
        </div>

        {/* Campo para nome do medicamento */}
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Medicamento
          </label>
          <textarea
            name="medicine"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: any) => setMedicine(e.target.value)} // Atualiza o estado de medicamento
            value={medicine}
          />
        </div>

        {/* Campo para dosagem do medicamento */}
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Dosagem
          </label>
          <textarea
            name="dosage"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: any) => setDosage(e.target.value)} // Atualiza o estado de dosagem
            value={dosage}
          />
        </div>

        {/* Campo para instruções de uso */}
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Instruções de uso
          </label>
          <textarea
            name="instructions"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: any) => setInstructions(e.target.value)} // Atualiza o estado de instruções
            value={instructions}
          />
        </div>

        {/* Botão de envio */}
        <div className="w-full py-2">
          <button
            type="submit"
            className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400"
            disabled={loading} // Desabilita o botão enquanto a requisição está em andamento
          >
            {loading ? "Enviando..." : "Submit"} {/* Exibe "Enviando..." durante o carregamento */}
          </button>
        </div>

        {/* Exibe mensagem de erro, se houver */}
        {error && (
          <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400" style={{ color: "red" }}>
            {error}
          </div>
        )}
      </form>
    </>
  );
}
