import { Component, OnInit } from '@angular/core';

interface Button {
  label: string;
  title: string;
  count?: number;
  type: string;
  color: string;
  state: string;
}

@Component({
  selector: 'app-estacionamiento',
  templateUrl: './estacionamiento.page.html',
  styleUrls: ['./estacionamiento.page.scss'],
})
export class EstacionamientoPage implements OnInit {
  buttons: Button[] = [];
  buttonTypes: string[] = ['visita', 'discapacitados', 'adicional'];

  data = [
    { id_est: 'V01', id_tipoest: 3, estado: 'libre' },
    { id_est: 'V02', id_tipoest: 3, estado: 'libre' },
    { id_est: 'V03', id_tipoest: 3, estado: 'libre' },
    { id_est: 'V04', id_tipoest: 3, estado: 'libre' },
    { id_est: 'D01', id_tipoest: 4, estado: 'ocupado' },
    { id_est: 'D02', id_tipoest: 4, estado: 'ocupado' },
    { id_est: 'D03', id_tipoest: 4, estado: 'ocupado' },
    { id_est: 'A01', id_tipoest: 5, estado: 'libre' },
    { id_est: 'A02', id_tipoest: 5, estado: 'libre' },
    { id_est: 'A03', id_tipoest: 5, estado: 'libre' },
    { id_est: 'A04', id_tipoest: 5, estado: 'libre' },
    { id_est: 'A05', id_tipoest: 5, estado: 'libre' },
    { id_est: 'A06', id_tipoest: 5, estado: 'libre' },
    { id_est: 'A07', id_tipoest: 5, estado: 'libre' },
    { id_est: 'A08', id_tipoest: 5, estado: 'libre' },
    { id_est: 'A09', id_tipoest: 5, estado: 'libre' },
    { id_est: 'A10', id_tipoest: 5, estado: 'libre' },
  ];

  ngOnInit() {
    this.generateButtons();
  }

  generateButtons() {
    const mapping: { [key: number]: { type: string; label: string } } = {
      3: { type: 'visita', label: 'Visita' },
      4: { type: 'discapacitados', label: 'Discapacitados' },
      5: { type: 'adicional', label: 'Adicional' },
    };

    this.buttons = this.data.reduce((acc: Button[], item) => {
      const { id_est, id_tipoest, estado } = item;

      if (!id_est.match(/[A-Z]/)) {
        return acc; // No mostrar botón si no tiene letra en id_est
      }

      const typeInfo = mapping[id_tipoest];
      if (!typeInfo) {
        return acc; // No hay información de tipo válida para el id_tipoest
      }

      const color = estado === 'libre' ? 'success' : 'danger';
      const label = `${typeInfo.label} ${id_est}`;
      const title = `Título ${typeInfo.label}`;
      const count = parseInt(id_est.substring(1), 10); // Parsear número sin letra a entero

      const button: Button = {
        label,
        title,
        count,
        type: typeInfo.type,
        color,
        state: estado,
      };

      return [...acc, button];
    }, []);
  }

  changeButtonState(button: Button) {
    button.state = button.state === 'verde' ? 'rojo' : 'verde';
    button.color = button.state === 'verde' ? 'success' : 'danger';
  }

  getTypeLabel(type: string): string {
    if (type === 'visita') {
      return 'Visita';
    } else if (type === 'discapacitados') {
      return 'Discapacitados';
    } else if (type === 'adicional') {
      return 'Adicional';
    } else {
      return '';
    }
  }

  getButtonsByType(type: string): Button[] {
    return this.buttons.filter((button) => button.type === type);
  }
}
