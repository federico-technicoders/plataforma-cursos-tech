'use client'
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'

export default function Contactenos() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        enterprise: ''
    })

    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()

    const handleForm = (evt) => {
        console.log(`Enviando: `, formData)
    }

    const handleFormData = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        })
    }
    console.log(formData)
    return (        
        <main className="flex flex-col justify-start items-start gap-10 w-full min-h-screen">
            <div className="">
                <h1>Contáctenos</h1>
                <h2>Subtitulo de contáctenos</h2>
            </div>
            <div className="flex flex-col justify-start items-center w-full">
                <form className="flex flex-col justify-start items-start gap-3  w-1/2" onClick={handleForm}>                
                    <label htmlFor="name" className="block text-sm font-medium">Nombre</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="mt-1 block  p-2 border border-gray-300 rounded-md shadow-sm bg-slate-500" 
                        value={formData.name}
                        onChange={handleFormData}
                    />               
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="mt-1 block  p-2 border border-gray-300 rounded-md shadow-sm bg-slate-500" 
                        value={formData.email}
                        onChange={handleFormData}
                    />               
                    <label htmlFor="enterprise" className="block text-sm font-medium">Empresa</label>
                    <input 
                        type="text" 
                        id="enterprise" 
                        name="enterprise" 
                        className="mt-1 block  p-2 border border-gray-300 rounded-md shadow-sm bg-slate-500" 
                        value={formData.enterprise}
                        onChange={handleFormData}
                    />               
                    <label htmlFor="subject" className="block text-sm font-medium">Asunto</label>
                    <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        className="mt-1 block  p-2 border border-gray-300 rounded-md shadow-sm bg-slate-500" 
                        value={formData.subject}
                        onChange={handleFormData}
                    />               
                    <label htmlFor="message" className="block text-sm font-medium">Mensaje</label>
                    <textarea 
                        type="text" 
                        id="message" 
                        name="message" 
                        className="mt-1 block  p-2 border border-gray-300 rounded-md shadow-sm bg-slate-500" 
                        value={formData.message}
                        onChange={handleFormData}
                    />               
                    <button type="submit" className="mt-2 block rounded-md border border-white w-64 p-3">Enviar</button>
                </form>
            </div>
        </main>
    )
}