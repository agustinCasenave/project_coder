import nodemailer from "nodemailer";
import { config } from "../config/config.js";

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: config.mailer.host,
			port: config.mailer.port,
			auth: config.mailer.auth,
		});
	}

	getMessageTemplate(type, content) {
		let body = "";

		switch (type) {
			case "ticket":
				body = `Gracias por su compra.
				
				<p>El código de compra es: ${content.code}</p>
				<p>El monto total es: ${content.amount}</p>
				<p>La fecha de compra es: ${content.purchase_datetime}</p>
				`;

				break;
		}
		return body;
	}

	async sendMail({ to, subject, type, content }) {
		const message = this.getMessageTemplate(type, content);
		const info = await this.transporter.sendMail({
			from: "mailer@example.com",
			to,
			subject,
			html: message,
			attachments: [],
		});
	}
}

export const mailService = new MailService();
