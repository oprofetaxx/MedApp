import React from "react";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div>
                <br />
                <h1 className="text-2xl font-bold">Doctors</h1>
                <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/doctor/create">Create new doctor</Link>
                <br />
                <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/doctor/list">List all doctors</Link>
                <br /><br />
                <h1 className="text-2xl font-bold">Pacients</h1>
                <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/pacient/create">Create new pacient</Link>
                <br />
                <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/pacient/list">List all pacients</Link>
                <br /><br />
                <h1 className="text-2xl font-bold">Appointments</h1>
                <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/appointment/create">Create new appointment</Link>
                <br />
                <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/appointment/list">List all appointments</Link>
                <br /><br />
                <h1 className="text-2xl font-bold">PraNNA</h1>
                
                <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/prescription/create">List all Prescription</Link>
                <br /><br />
                <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/fake">Access FakeApi</Link>
            </div>
        </>
    );
}
