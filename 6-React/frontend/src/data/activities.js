// Unidad 6: datos locales. En la Unidad 7 se reemplazan por un fetch a json-server (ver db.json)
export const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export const activities = [
  {
    nombre: 'Taekwondo',
    descripcion: 'Arte marcial coreana',
    horarios: [
      { dia: 2, 'hora-inicio': '18:30', 'hora-fin': '20:00' },
      { dia: 4, 'hora-inicio': '18:30', 'hora-fin': '20:00' },
    ],
  },
  {
    nombre: 'Zumba',
    descripcion: 'Ritmos latinos',
    horarios: [
      { dia: 1, 'hora-inicio': '19:30', 'hora-fin': '20:30' },
      { dia: 3, 'hora-inicio': '19:30', 'hora-fin': '20:30' },
    ],
  },
  {
    nombre: 'Yoga',
    descripcion: 'Respiración, fuerza y flexibilidad',
    horarios: [
      { dia: 2, 'hora-inicio': '08:00', 'hora-fin': '09:00' },
      { dia: 5, 'hora-inicio': '08:00', 'hora-fin': '09:00' },
    ],
  },
  {
    nombre: 'Funcional',
    descripcion: 'Entrenamiento en circuito',
    horarios: [
      { dia: 1, 'hora-inicio': '07:00', 'hora-fin': '08:00' },
      { dia: 3, 'hora-inicio': '07:00', 'hora-fin': '08:00' },
      { dia: 5, 'hora-inicio': '07:00', 'hora-fin': '08:00' },
    ],
  },
]
