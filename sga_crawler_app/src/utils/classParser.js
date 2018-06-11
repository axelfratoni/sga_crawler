export const getDay = day => {
  switch (day) {
    case 'Lunes':
      return 'mon';
    case 'Martes':
      return 'tue';
    case 'Miércoles':
      return 'wed';
    case 'Jueves':
      return 'thu';
    case 'Viernes':
      return 'fri';
    case 'Sábado':
      return 'sat';
    case 'Domingo':
      return 'sun';
    default:
      return '';
  }
};

export const getStartHour = start => parseInt(start.split(':')[0], 10);

export const getDuration = (start, finish) =>
  parseInt(finish.split(':')[0], 10) - parseInt(start.split(':')[0], 10);
