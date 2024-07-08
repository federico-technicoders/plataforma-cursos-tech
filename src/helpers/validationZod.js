// validation/contactSchema.js
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(3, 'El nombre es obligatorio'),
  subject: z.string().optional(),
  enterprice: z.string().optional(),
  email: z.string().email('Correo electrónico no válido'),
  message: z.string().min(5, 'El mensaje es obligatorio'),
});

export default contactSchema;