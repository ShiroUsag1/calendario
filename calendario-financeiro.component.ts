import { Component, OnInit } from '@angular/core';
import { EventoFinanceiro } from '../../model/eventofinanceiro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { mockEventosFinanceiros } from '../../model/eventofinanceiroMock';

@Component({
  selector: 'app-calendario-financeiro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendario-financeiro.component.html',
  styleUrl: './calendario-financeiro.component.scss',
})
export class CalendarioFinanceiroComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  weeks: any[] = [];
  events: EventoFinanceiro[] = [];
  selectedDayEvents: EventoFinanceiro[] = [];

  weekDays: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  novoEvento: EventoFinanceiro;
  newEvent: boolean = false;

  ngOnInit() {
    this.generateCalendar(this.currentYear, this.currentMonth);
    this.loadEvents();
  }

  generateCalendar(year: number, month: number) {
    this.weeks = []; // Resetar semanas a cada geração de calendário
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        week.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      this.weeks.push(week);
    }
  }

  loadEvents() {
    this.events = mockEventosFinanceiros.getDados();
  }

  hasEvent(day: Date): boolean {
    if (!day) {
      return false;
    }
    return this.events.some(
      (event) => event.data.toDateString() === day.toDateString()
    );
  }

  mostrarEventos(day: Date) {
    this.selectedDayEvents = this.events.filter(
      (event) => event.data.toDateString() === day.toDateString()
    );
    this.iniciarTransicao();
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
    this.loadEvents();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
    this.loadEvents();
  }

  getCurrentMonthName(): string {
    const monthNames = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    return monthNames[this.currentMonth];
  }

  iniciarTransicao() {
    const modalCalendario = document.querySelector(
      '.modalCalendario'
    ) as HTMLElement;
    modalCalendario.classList.add('show');
  }

  iniciarSegundaTransicao() {
    const modalContent = document.querySelector(
      '.modal-content'
    ) as HTMLElement;
    modalContent.classList.add('show');
  }

  fecharModal() {
    const modalContent = document.querySelector(
      '.modal-content'
    ) as HTMLElement;
    const modalCalendario = document.querySelector(
      '.modalCalendario'
    ) as HTMLElement;
    modalContent.classList.remove('show');
    modalCalendario.classList.remove('show');

    modalContent.style.transition = 'none';
    modalContent.offsetHeight;
    modalContent.style.transition = '';
    modalCalendario.style.transition = 'none';
    modalCalendario.offsetHeight;
    modalCalendario.style.transition = '';
    this.newEvent = false;
  }

  abriFormModal() {
    this.newEvent = true;
    this.iniciarTransicao();
  }
}
