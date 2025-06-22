import nodemailer from 'nodemailer';
import config from 'config';

const MAIL_HOST = config.get('mailer.host');
const MAIL_PORT = config.get('mailer.port');
const MAIL_USER = config.get('mailer.auth.user');
const MAIL_PASS = config.get('mailer.auth.pass');
const APP_URL = config.get('app.clientURL');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            secure: false,
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS
            }
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: MAIL_USER,
            to,
            subject: 'Активация аккаунта на ' + APP_URL,
            text: '',
            html: `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        });
    }
}

const instanceOfMailService = new MailService();
export { instanceOfMailService as MailService };
