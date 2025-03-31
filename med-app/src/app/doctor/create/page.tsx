"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DoctorCreate() {

    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [medicalSpecialty, setMedicalSpecialty] = useState<string>('');
    const [medicalRegistration, setMedicalRegistration] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // Função para formatar o telefone no formato correto: 99 91234-5678
    const formatPhoneNumber = (phone: string) => {
        let cleaned = ('' + phone).replace(/\D/g, '');
        let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        
        if (match) {
            return match[1] + ' ' + match[2] + '-' + match[3];
        }
        
        return null;
    };

    const addDoctor = async (e: any) => {
        e.preventDefault();
        setError(null);

        if (name !== "" && login !== ""
            && password !== "" && medicalSpecialty !== ""
            && medicalRegistration !== "" && email !== "" && phone !== "") {

            const formattedPhone = formatPhoneNumber(phone);

            if (!formattedPhone) {
                setError('Invalid phone number format. Please use: 99 91234-5678');
                return;
            }

            const formData = {
                name: name,
                login: login,
                password: password,
                medicalSpecialty: medicalSpecialty,
                medicalRegistration: medicalRegistration,
                email: email,
                phone: formattedPhone
            };

            try {
                const add = await fetch('http://localhost:3001/doctors/postDoctor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem("token") || ''
                    },
                    body: JSON.stringify(formData)
                });

                const content = await add.json();

                if (add.ok && content.login) {
                    // Redirecionar para a página "home" após sucesso
                    router.push('/home');
                } else {
                    setError(content.error || 'Ocorreu um erro ao criar o médico.');
                }
            } catch (error) {
                setError('Erro de rede ou servidor. Tente novamente mais tarde.');
            }
        } else {
            setError('Por favor, preencha todos os campos.');
        }
    };

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/home">Voltar</Link>
            <form className='w-full' onSubmit={addDoctor}>
                <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Formulário Criação de Médico</span>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Nome</label>
                    <input type='text' name='name' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setName(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Login</label>
                    <textarea name='login' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setLogin(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Senha</label>
                    <textarea name='password' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setPassword(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Especialidade Médica</label>
                    <textarea name='medicalSpecialty' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setMedicalSpecialty(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Registro Médico</label>
                    <textarea name='medicalRegistration' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setMedicalRegistration(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Email</label>
                    <textarea name='email' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setEmail(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Telefone</label>
                    <textarea name='phone' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setPhone(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
                </div>
                <div>
                    {error && <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400" style={{ color: 'red' }}>{error}</div>}
                </div>
            </form>
        </>
    );
}
