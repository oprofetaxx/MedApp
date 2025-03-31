"use client"
import React, { useEffect, useState } from 'react'; 
import Link from 'next/link';

export default function DoctorList() {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:3001/doctors/doctors', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem("token") || ''
                    },
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar médicos");
                }

                const data = await response.json();
                setDoctors(data);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchDoctors();
    }, []); // Agora só roda uma vez ao montar o componente

    const deleteDoctor = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3001/doctors/doctors/67e713f12ed116279df22934`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("token") || ''
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao deletar médico");
            }

            setDoctors(doctors.filter(doctor => doctor._id !== id));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/home">Voltar</Link>
            <table>
                <thead>
                    <tr>
                        <th className='border border-slate-300'>Nome</th>
                        <th className='border border-slate-300 text-center'>Login</th>
                        <th className='border border-slate-300 text-center'>Especialidade Médica</th>
                        <th className='border border-slate-300 text-center'>Registro Médico</th>
                        <th className='border border-slate-300 text-center'>Email</th>
                        <th className='border border-slate-300 text-center'>Telefone</th>
                        <th className='border border-slate-300 text-center'>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <tr key={doctor._id}>
                                <td className='border border-slate-300'>{doctor.name}</td>
                                <td className='border border-slate-300 text-center'>{doctor.login}</td>
                                <td className='border border-slate-300 text-center'>{doctor.medicalSpecialty}</td>
                                <td className='border border-slate-300 text-center'>{doctor.medicalRegistration}</td>
                                <td className='border border-slate-300 text-center'>{doctor.email}</td>
                                <td className='border border-slate-300 text-center'>{doctor.phone}</td>
                                <td className='border border-slate-300 text-center'>
                                    <button onClick={() => deleteDoctor(doctor._id)} className='bg-red-500 p-2 inline-block text-white text-sm'>Delete</button>
                                    <Link href={`/doctor/edit/${doctor._id}`} className='bg-yellow-500 p-2 inline-block ml-3 text-white text-sm'>Edit</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center py-4">Nenhum médico encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {error && <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400">{error}</div>}
        </>
    );
}
