"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PacientEdit(params: any) {
    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [birthDate, setBirthDate] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [pacient, setPacient] = useState({ name, birthDate, email, phone });

    const id = params.params.id;

    useEffect(() => {
        // Carregar dados do paciente específico
        fetch(`http://localhost:3001/patients/getPatient/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                // Ajustando a formatação de data para o formato desejado
                const formattedDate = new Date(data.birthDate).toLocaleDateString("pt-BR");
                setPacient({
                    ...data,
                    birthDate: formattedDate,
                });
                setName(data.name);
                setEmail(data.email);
                setPhone(data.phone);
                setBirthDate(formattedDate);
            }
        });
    }, [id]);

    const edit = async (e: any) => {
        e.preventDefault();
        setError(null);

        // Atualizar os dados, utilizando o valor digitado ou o que foi carregado inicialmente
        const formData = {
            name: name || pacient.name,
            birthDate: birthDate || pacient.birthDate,
            email: email || pacient.email,
            phone: phone || pacient.phone
        };

        // Enviar a atualização para o backend
        const response = await fetch(`http://localhost:3001/patients/patients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
            body: JSON.stringify(formData)
        });

        const content = await response.json();

        if (content.name) {
            // Após editar com sucesso, navegar para a página desejada
            router.push('/pacient/list'); // Alterei o redirecionamento para '/pacient/list'
        } else {
            setError(content.error);
        }
    };

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/pacient/list">Voltar</Link>
            <form className="w-full" onSubmit={edit}>
                <span className="font-bold text-yellow-500 py-2 block underline text-2xl">Formulário de Edição de Paciente</span>
                
                {/* Nome */}
                <div className="w-full py-2">
                    <label htmlFor="name" className="text-sm font-bold py-2 block">Nome</label>
                    <input
                        type="text"
                        id="name"
                        value={name || pacient.name}
                        className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Data de Nascimento */}
                <div className="w-full py-2">
                    <label htmlFor="birthDate" className="text-sm font-bold py-2 block">Nascimento</label>
                    <input
                        type="text"
                        id="birthDate"
                        value={birthDate || pacient.birthDate}
                        className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className="w-full py-2">
                    <label htmlFor="email" className="text-sm font-bold py-2 block">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email || pacient.email}
                        className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Telefone */}
                <div className="w-full py-2">
                    <label htmlFor="phone" className="text-sm font-bold py-2 block">Telefone</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone || pacient.phone}
                        className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                {/* Botão de Submit */}
                <div className="w-full py-2">
                    <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
                </div>

                {/* Exibindo erros, se houver */}
                <div>
                    {error && <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400">{error}</div>}
                </div>
            </form>
        </>
    );
}
