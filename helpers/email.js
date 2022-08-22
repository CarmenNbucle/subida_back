import nodemailer from 'nodemailer'

export const emailRegistro = async(datos) => {
 const {email, nombre, token} = datos;

 const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Info del email
  const info = await transport.sendMail({
    from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Confirma tu cuenta",
    text: "Comprueba tu cuenta en UpTask",
    html: `
        <p> Hola, ${nombre}</p>
        <p>Tu cuenta ya está casi lista, solo debes verificarla en este enlace: </p>
        <p><a href="${process.env.FRONTEND_URL}/confirmar/${token}">Verificar cuenta</a></p>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>
    `
  })
}

export const emailOlvidePassword = async(datos) => {
  const {email, nombre, token} = datos;
  
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
   });
 
   // Info del email
   const info = await transport.sendMail({
     from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
     to: email,
     subject: "UpTask - Reestablecer password",
     text: "Comprueba tu cuenta en UpTask",
     html: `
         <p> Hola, ${nombre}</p>
         <p>Has solicitado reestablecer tu password, puedes generar uno nuevo en este enlace: </p>
         <p><a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a></p>
         <p>Si tu no solicitaste este email, puedes ignorar este mensaje.</p>
     `
   })
 }