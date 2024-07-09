'use client'
import { postServicios } from "@/api"
import contactSchema from "@/helpers/validationZod"
import { useRouter } from "next/navigation"


import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'

// export const metadata = () => ({
//     title: "Contactenos",
//     description: "Contactenos para cualquier consulta o duda"
// })

export default function Contactenos() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        enterprise: ''
    })
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()
    const router = useRouter()

    const handleFormSubmit = async (evt) => {
        // console.log(`Enviando: `, formData)
        // evt.preventDefault()
        const formDataParsed = contactSchema.safeParse(formData)
        if (!formDataParsed.success) {
            formDataParsed.error.errors.forEach((error) => {
                setError(error.path[0], { 
                    type: 'manual',
                    message: error.message 
                })
            })
            return
        }

        try {
            const res = await postServicios(formData)
            console.log(res)
            if(res.data && res.data.status === 400){
                alert(res.message)
            }            
            router.push('/agradecimiento')
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleFormData = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        })
    }
    
    return (        
        <main className="flex flex-col justify-start items-start gap-10 w-full min-h-screen">
            <div className="">
                <h1>Contáctenos</h1>
                <h2>Subtitulo de contáctenos</h2>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
                <form className="flex flex-col justify-start items-start gap-3  w-1/2 p-10" onSubmit={ handleSubmit(handleFormSubmit)}>                
                    <label htmlFor="name" className="block text-sm font-medium">Nombre y Apellido</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="mt-1 block  p-2 border border-gray-300 rounded-md shadow-sm bg-slate-500" 
                        {...register('name')}
                        value={formData.name}
                        onChange={handleFormData}
                    />  
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}             
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="mt-1 block  p-2 border border-gray-300 rounded-md shadow-sm bg-slate-500" 
                        {...register('email')}
                        value={formData.email}
                        onChange={handleFormData}
                    />        
                     {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}    
                    <label htmlFor="enterprise" className="block text-sm font-medium">Empresa</label>
                    <input 
                        type="text" 
                        id="enterprise" 
                        name="enterprise" 
                        className="mt-1 block  p-2 border border-gray-300 rounded-md shadow-sm bg-slate-500" 
                        {...register('enterprise')}
                        value={formData.enterprise}
                        onChange={handleFormData}
                    />             
                     {errors.enterprise && <p className="text-red-500 text-sm mt-1">{errors.enterprise.message}</p>}      
                    <label htmlFor="subject" className="block text-sm font-medium">Asunto</label>
                    <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        className="mt-1 block  p-2 border border-gray-300 rounded-md shadow-sm bg-slate-500" 
                        value={formData.subject}
                        onChange={handleFormData}
                    />     
                     {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}              
                    <label htmlFor="message" className="block text-sm font-medium">Mensaje</label>
                    <textarea 
                        type="text" 
                        id="message" 
                        name="message" 
                        className="mt-1 block  p-2 border border-gray-300 rounded-md shadow-sm bg-slate-500" 
                        {...register('message')}
                        value={formData.message}
                        onChange={handleFormData}
                    />  
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}                 
                    <button type="submit" className="mt-2 block rounded-md border border-white w-64 p-3">Enviar</button>
                </form>
            </div>
        </main>
    )
}