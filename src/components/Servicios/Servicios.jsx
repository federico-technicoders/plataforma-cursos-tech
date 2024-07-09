

export const Servicios = ({servicios}) => {
    return (
        <section className="flex justify-around items-center">
            {
              servicios.map(({id, title, acf: {title: titulo, description, icono}}) => (
                <>
                  <div key={id} className="w-1/2">
                    <h1>{titulo}</h1>
                    <img src={icono} alt="imagen" />
                    <p>{description}</p>
                  </div>
                 
                </>
              ))
            }
        </section>
    )
}
