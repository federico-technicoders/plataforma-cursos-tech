export const getServicios = async () => await fetch('https://wordpress-1266087-4562991.cloudwaysapps.com/wp-json/wp/v2/servicios', {
    cache: 'no-store'
}).then(res => res.json())
export const postServicios = async (newService) => await fetch('https://wordpress-1266087-4562991.cloudwaysapps.com/wp-json/contact/v2/submit',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        },
    body: JSON.stringify(newService)
            
}).then(res => res.json())