
export const metadata = () => ({    
        title: 'Página | Agradecimiento',
        description: 'Get metadata about the bot',
    })

const page = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full min-h-screen">
        <h1>Gracias por su mensaje</h1>
        <h2>En breve le responderemos</h2>
    </section>
  )
}
export default page