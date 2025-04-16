import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  generateDateTimeString(minutesAgo: number) {
    var date = new Date();
    date.setMinutes(date.getMinutes() - minutesAgo);

    const dataFormatada = date.toLocaleDateString('en-CA', { // Formato AAAA-MM-DD
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const horaFormatada = date.toLocaleTimeString('en-CA', { // Formato HH:MM
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Formato 24 horas
    });

    return `${dataFormatada} ${horaFormatada}`;
  }

  getFormatedCurrentDateTime() {
    const dataAtual = new Date();

    const dataFormatada = dataAtual.toLocaleDateString('en-CA', { // Formato AAAA-MM-DD
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const horaFormatada = dataAtual.toLocaleTimeString('en-CA', { // Formato HH:MM
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    return `${dataFormatada} ${horaFormatada}`;
  }
}
