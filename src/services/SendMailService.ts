import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {

    // Receberá a conta fake criada pelo nodemailer no construtor
    private client: Transporter;

    // Construtor que vai criar a conta de test para email
    constructor () {
        // then funciona como async e await, pois construtor não aceita ser assíncrono
        nodemailer.createTestAccount().then(account => {
           
            // Criando um SMTP para transporte de objeto
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
            
            this.client = transporter;
        })
    }

    // Método pra enviar o e-mail, para enviar vai precisar receber:
    /*
        to: para quem vai enviar o email
        subject: assunto do email
        body: corpo do email
    */
    async execute (to: string, subject: string, body: string) {

        // Usuário de email fake criado para enviar email
        const message = await this.client.sendMail({
            to,
            subject,
            html: body,
            from: "NPS <noreplay@nps.com.br>"
        })

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}

// Esse export já cria a instância quando a aplicação for executada
export default new SendMailService();