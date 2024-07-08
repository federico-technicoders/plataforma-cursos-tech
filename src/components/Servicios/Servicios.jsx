

export const Servicios = ({servicios}) => {
    return (
        <section>
            {
              servicios.map(({id, title, acf: {title: titulo, description, icono}}) => (
                <>
                  <div key={id}>
                    <h1>{titulo}</h1>
                    <img src={icono} alt="imagen" />
                    <p>{description}</p>
                  </div>
                  <hr/>
                  <br/>
                </>
              ))
            }
        </section>
    )
}
