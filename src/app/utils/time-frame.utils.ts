export class TimeFrameUtils {
  // Convertir período de tiempo a milisegundos
  static getTimeFrameMs(timeFrame: 'day' | 'week' | 'month'): number {
    const timeFrameMs = {
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000
    };
    return timeFrameMs[timeFrame];
  }

  // Verificar si una partida está dentro del período
  static isMatchInTimeFrame(matchTime: number, timeFrame: 'day' | 'week' | 'month'): boolean {
    const now = Date.now();
    const timeFrameMs = this.getTimeFrameMs(timeFrame);
    return now - matchTime <= timeFrameMs;
  }

  // Obtener el nombre del período
  static getTimeFrameName(timeFrame: 'day' | 'week' | 'month'): string {
    const names = {
      day: 'Día',
      week: 'Semana',
      month: 'Mes'
    };
    return names[timeFrame];
  }
}
