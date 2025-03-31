"use client"
import React, { useEffect, useState } from 'react'; // HOOK = gancho
import Link from 'next/link';

export default function PacientList() {
    const [pacients, setPacients] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3001/patients/patients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json())
        .then(data => setPacients(data));
    }, []);

    const deletePacient = async (id: string) => {
        const response = await fetch(`http://localhost:3001/patients/patients/del`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        });
        const content = await response.json();
        
        if (content) {
            // Remove o paciente da lista localmente sem precisar recarregar a página
            setPacients(prevPacients => prevPacients.filter(pacient => pacient._id !== id));
        } else {
            setError(content.error);
        }
    }

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/home">Voltar</Link>
            <table className="w-full mt-4">
                <thead>
                    <tr>
                        <td className='border border-slate-300 px-4 py-2'>Nome</td>
                        <td className='border border-slate-300 text-center px-4 py-2'>Nascimento</td>
                        <td className='border border-slate-300 text-center px-4 py-2'>Email</td>
                        <td className='border border-slate-300 text-center px-4 py-2'>Telefone</td>
                        <td className='border border-slate-300 text-center px-4 py-2'>Ações</td>
                    </tr>
                </thead>

                <tbody>
                    {!!pacients.length && pacients.map((pacient: any) => (
                        <tr key={pacient._id}>
                            <td className='border border-slate-300 px-4 py-2'>{pacient.name}</td>
                            <td className='border border-slate-300 text-center px-4 py-2'>{pacient.birthDate}</td>
                            <td className='border border-slate-300 text-center px-4 py-2'>{pacient.email}</td>
                            <td className='border border-slate-300 text-center px-4 py-2'>{pacient.phone}</td>
                            <td className='border border-slate-300 text-center px-4 py-2'>
                                <button onClick={() => deletePacient(pacient._id)} className='bg-red-500 p-2 text-white text-sm rounded'>Delete</button>
                                <Link href={`/pacient/edit/${pacient._id}`} className='bg-yellow-500 p-2 ml-3 text-white text-sm rounded'>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {error && (
                <div className="p-2 mt-4 text-white bg-red-400 rounded-sm">
                    {error}
                </div>
            )}
        </>
    );
}
