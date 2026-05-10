import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqs = [
    {
      question: '¿Cuánto tarda el envío?',
      answer: 'Los pedidos nacionales suelen entregarse entre 24 y 72 horas laborables. Los envíos internacionales pueden tardar entre 5 y 10 días laborables.'
    },
    {
      question: '¿Puedo devolver un producto?',
      answer: 'Sí. Dispones de 14 días naturales desde la recepción del pedido para solicitar una devolución.'
    },
    {
      question: '¿Qué métodos de pago aceptáis?',
      answer: 'Aceptamos tarjetas Visa, MasterCard, PayPal y otros métodos de pago seguros disponibles durante el proceso de compra.'
    },
    {
      question: '¿Cómo puedo contactar con soporte?',
      answer: 'Puedes escribirnos mediante el formulario de contacto o enviando un correo a soporte@tradebrands.com.'
    },
    {
      question: '¿Los productos son originales?',
      answer: 'Sí. Todos los productos vendidos en TradeBrands son originales y seleccionados cuidadosamente de marcas verificadas.'
    },
    {
      question: '¿Hacéis envíos internacionales?',
      answer: 'Sí, realizamos envíos a varios países de Europa y otras regiones seleccionadas.'
    }
  ];
}