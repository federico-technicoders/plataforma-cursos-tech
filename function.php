<!-- todo esto va al endpoint /wp-json/contact/v2/submit -->
<?php
    function create_custom_post_type() {
        register_post_type('mensaje',
            array(
                'labels'      => array(
                    'name'          => __('Mensajes'),
                    'singular_name' => __('Mensaje'),
                ),
                'public'      => true,
                'has_archive' => true,
                'supports'    => array('title', 'editor', 'custom-fields'),
            )
        );
    }

    add_action('init', 'create_custom_post_type');
    
    function handle_contact_form_submission() {
        $parameters = json_decode(file_get_contents('php://input'), true);
    
        // Sanitizar y validar los datos recibidos
        $name = sanitize_text_field($parameters['name']);
        $email = sanitize_email($parameters['email']);
        $message = sanitize_textarea_field($parameters['message']);
        $subject = sanitize_text_field($parameters['subject']);
        $enterprise = sanitize_text_field($parameters['enterprise']);
    
        // Crear un nuevo post tipo "mensaje" y almacenar los datos en ACF
        $post_id = wp_insert_post(array(
            'post_title'  => $name,
            'post_type'   => 'mensaje', 
            'post_status' => 'publish'
        ));
    
        if ($post_id) {
            update_field('nombre', $name, $post_id);
            update_field('email', $email, $post_id);
            update_field('mensaje', $message, $post_id);
            update_field('asunto', $subject, $post_id);
            update_field('empresa', $enterprise, $post_id);
    
            // Enviar correo electrónico al administrador
            $to = get_option('admin_email');
            $subject = 'Nuevo mensaje de contacto';
            $body = "Nombre: $name\nEmail: $email\nAsunto: $subject\nEmpresa: $enterprise\nMensaje:\n$message";
            $headers = array('Content-Type: text/plain; charset=UTF-8');
    
            wp_mail($to, $subject, $body, $headers);
    
            return new WP_REST_Response('Mensaje enviado exitosamente', 200);
        }
    
        return new WP_REST_Response('Error al enviar el mensaje', 500);
    }
    
    add_action('rest_api_init', function () {
        register_rest_route('contact/v2', '/submit', array(
            'methods' => 'POST',
            'callback' => 'handle_contact_form_submission',
            'permission_callback' => function() {
                return true; 
            },
        ));
    });