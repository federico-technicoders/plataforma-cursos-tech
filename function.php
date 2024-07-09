<!-- todo esto va al endpoint /wp-json/contact/v2/submit -->
<?php
    // function create_custom_post_type() {
    //     register_post_type('mensaje',
    //         array(
    //             'labels'      => array(
    //                 'name'          => __('Mensajes'),
    //                 'singular_name' => __('Mensaje'),
    //             ),
    //             'public'      => true,
    //             'has_archive' => true,
    //             'supports'    => array('title', 'editor', 'custom-fields'),
    //         )
    //     );
    // }

    // add_action('init', 'create_custom_post_type');
    
    // function handle_contact_form_submission() {
    //     $parameters = json_decode(file_get_contents('php://input'), true);
    
    //     // Sanitizar y validar los datos recibidos
    //     $name = sanitize_text_field($parameters['name']);
    //     $email = sanitize_email($parameters['email']);
    //     $message = sanitize_textarea_field($parameters['message']);
    //     $subject = sanitize_text_field($parameters['subject']);
    //     $enterprise = sanitize_text_field($parameters['enterprise']);
    
    //     // Crear un nuevo post tipo "mensaje" y almacenar los datos en ACF
    //     $post_id = wp_insert_post(array(
    //         'post_title'  => $name,
    //         'post_type'   => 'mensaje', 
    //         'post_status' => 'publish'
    //     ));
    
    //     if ($post_id) {
    //         update_field('nombre', $name, $post_id);
    //         update_field('email', $email, $post_id);
    //         update_field('mensaje', $message, $post_id);
    //         update_field('asunto', $subject, $post_id);
    //         update_field('empresa', $enterprise, $post_id);
    
    //         // Enviar correo electrónico al administrador
    //         $to = get_option('admin_email');
    //         $subject = 'Nuevo mensaje de contacto';
    //         $body = "Nombre: $name\nEmail: $email\nAsunto: $subject\nEmpresa: $enterprise\nMensaje:\n$message";
    //         $headers = array('Content-Type: text/plain; charset=UTF-8');
    
    //         wp_mail($to, $subject, $body, $headers);
    
    //         return new WP_REST_Response('Mensaje enviado exitosamente', 200);
    //     }
    
    //     return new WP_REST_Response('Error al enviar el mensaje', 500);
    // }
    
    // add_action('rest_api_init', function () {
    //     register_rest_route('contact/v2', '/submit', array(
    //         'methods' => 'POST',
    //         'callback' => 'handle_contact_form_submission',
    //         'permission_callback' => function() {
    //             return true; 
    //         },
    //     ));
    // });


    add_action('rest_api_init', function () {
        register_rest_route('contact/v2', '/submit', array(
            'methods' => 'POST',
            'callback' => 'handle_contact_submit',
            'permission_callback' => '__return_true',
        ));
    });
    
    function handle_contact_submit($request) {
        $data = $request->get_json_params(); // Obtener datos JSON del cuerpo de la solicitud
    
        // Verificar y asegurar que se han recibido los campos necesarios
        if (isset($data['name']) && isset($data['email']) && isset($data['message'])) {
            $name = sanitize_text_field($data['name']);
            $email = sanitize_email($data['email']);
            $message = sanitize_textarea_field($data['message']);
            
            // Validar los campos
            if (!preg_match('/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/', $name)) {
                return new WP_Error('invalid_name', 'El nombre contiene caracteres no permitidos', array('status' => 400));
            }
            
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return new WP_Error('invalid_email', 'El correo electrónico no es válido', array('status' => 400));
            }

            if (!preg_match('/^[a-zA-ZáéíóúñÑÁÉÍÓÚ0-9\s.,!?]+$/', $message)) {
                return new WP_Error('invalid_message', 'El mensaje contiene caracteres no permitidos', array('status' => 400));
            }
    
            // Validar subject si está presente y no está vacío
            $subject = isset($data['subject']) ? sanitize_text_field($data['subject']) : '';
            if (!empty($subject) && !preg_match('/^[a-zA-ZáéíóúñÑÁÉÍÓÚ0-9\s.,!?]+$/', $subject)) {
                return new WP_Error('invalid_subject', 'El asunto contiene caracteres no permitidos', array('status' => 400));
            }
    
            // Validar enterprise si está presente y no está vacío
            $enterprise = isset($data['enterprise']) ? sanitize_text_field($data['enterprise']) : '';
            if (!empty($enterprise) && !preg_match('/^[a-zA-ZáéíóúñÑÁÉÍÓÚ0-9\s.,!?]+$/', $enterprise)) {
                return new WP_Error('invalid_enterprise', 'La empresa contiene caracteres no permitidos', array('status' => 400));
            }
    
            // Construir el array de respuesta JSON
            $response_data = array(
                'name' => $name,
                'email' => $email,
                'message' => $message,
                'subject' => $subject,
                'enterprise' => $enterprise,
            );
    
            // Devolver los datos como respuesta JSON
            return rest_ensure_response($response_data);
        } else {
            // En caso de que falten campos obligatorios, devolver un mensaje de error
            return new WP_Error('missing_fields', 'Nombre, correo electrónico y mensaje son campos obligatorios', array('status' => 400));
        }
    }