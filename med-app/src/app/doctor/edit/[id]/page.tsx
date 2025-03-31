"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DoctorEdit({ params }: { params: { id: string } }) {
    const router = useRouter();
    const id = params.id;

    const [doctor, setDoctor] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [medicalSpecialty, setMedicalSpecialty] = useState<string>('');
    const [medicalRegistration, setMedicalRegistration] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    useEffect(() => {
        fetch(`http://localhost:3001/doctors/doctors`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        })
        .then(response => response.json())
        .then(data => {
            setDoctor(data);
            setName(data.name);
            setLogin(data.login);
            setMedicalSpecialty(data.medicalSpecialty);
            setMedicalRegistration(data.medicalRegistration);
            setEmail(data.email);
            setPhone(data.phone);
        })
        .catch(error => {
            setError("Erro ao buscar médico");
            console.error(error);
        });
    }, [id]);

    const editDoctor = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const formData = {
            name,
            login,
            password: password || doctor.password, 
            medicalSpecialty,
            medicalRegistration,
            email,
            phone
        };

        const response = await fetch(`http://localhost:3001/doctors/doctors`, {
            method: 'PUT',  // Alterado para PUT
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
            body: JSON.stringify(formData)
        });

        const content = await response.json();

        if (response.ok) {
            router.push('/doctor/list');
        } else {
            setError(content.error || "Erro ao atualizar médico");
        }
    };

    if (!doctor) return <p>Carregando...</p>;

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/doctor/list">Voltar</Link>
            <form className='w-full' onSubmit={editDoctor}>
                <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Editar Médico</span>

                <div className='w-full py-2'>
                    <label className='text-sm font-bold py-2 block'>Nome</label>
                    <input type='text' value={name} className='w-full border p-2 rounded-sm' onChange={(e) => setName(e.target.value)} />
                </div>

                <div className='w-full py-2'>
                    <label className='text-sm font-bold py-2 block'>Login</label>
                    <input type='text' value={login} className='w-full border p-2 rounded-sm' onChange={(e) => setLogin(e.target.value)} />
                </div>

                <div className='w-full py-2'>
                    <label className='text-sm font-bold py-2 block'>Senha</label>
                    <input type="password" placeholder="Digite uma nova senha (opcional)" className='w-full border p-2 rounded-sm' onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className='w-full py-2'>
                    <label className='text-sm font-bold py-2 block'>Especialidade Médica</label>
                    <input type='text' value={medicalSpecialty} className='w-full border p-2 rounded-sm' onChange={(e) => setMedicalSpecialty(e.target.value)} />
                </div>

                <div className='w-full py-2'>
                    <label className='text-sm font-bold py-2 block'>Registro Médico</label>
                    <input type='text' value={medicalRegistration} className='w-full border p-2 rounded-sm' onChange={(e) => setMedicalRegistration(e.target.value)} />
                </div>

                <div className='w-full py-2'>
                    <label className='text-sm font-bold py-2 block'>Email</label>
                    <input type='email' value={email} className='w-full border p-2 rounded-sm' onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='w-full py-2'>
                    <label className='text-sm font-bold py-2 block'>Telefone</label>
                    <input type='text' value={phone} className='w-full border p-2 rounded-sm' onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className='w-full py-2'>
                    <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Salvar</button>
                </div>

                {error && <div className="p-2 text-white border border-gray-200 rounded-sm bg-red-400">{error}</div>}
            </form>
        </>
    );
}
