import { Controller, Post, Body } from '@nestjs/common';
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

@Controller('payments')
export class PaymentsController {
  @Post('create-checkout-session')
  async createSession(@Body() body: { items: any[] }) {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: body.items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: { name: item.product.name },
            unit_amount: Math.round(item.product.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: 'http://localhost:3000/?success=true',
        cancel_url: 'http://localhost:3000/?canceled=true',
      });
      return { url: session.url };
    } catch (error) {
      return { error: error.message };
    }
  }
}