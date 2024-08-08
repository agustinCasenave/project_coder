import { ticketModel } from "./models/ticket.model.js";
import { userDao } from "./user.dao.js";
import { cartDao } from "./cart.dao.js";
import { config } from "../../config/config.js";
import { mailService } from "../../services/mail.service.js";

class TicketDaoMongo {
	async createTicket(user, cart) {
		try {
			const ticket = await ticketModel.create({
				code: Math.random().toString(36).substring(2, 15),
				purchase_datetime: Date.now(),
				amount: cart.products.reduce(
					(acc, curr) => acc + curr.quantity * curr.product.price,
					0
				),
				purchaser: user._id,
			});
			return ticket;
		} catch (error) {
			throw new Error(error);
		}
	}

	async getTicketById(id) {
		try {
			return await ticketModel
				.findById(id)
				.populate("purchaser", "first_name last_name email");
		} catch (error) {
			throw new Error(error);
		}
	}
}

export const ticketDao = new TicketDaoMongo();
