import { Injectable } from '@angular/core';
import { ScheduleRule, TimePatternType, TimeSlot, DayPattern, DayPatternType } from '../models/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleGeneratorService {
  private readonly FULL_DAY_NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  generate(rules: ScheduleRule[]): string {
    if (!rules || rules.length === 0) {
      return '';
    }
    return rules
      .map(rule => this.generateRuleString(rule))
      .filter(str => str.trim() !== '')
      .join(', ');
  }

  private generateRuleString(rule: ScheduleRule): string {
    const dayPart = this.generateDayPart(rule.dayPattern);
    if (!dayPart) return '';
    const timePart = this.generateTimePart(rule.timePattern);
    return `${dayPart} ${timePart}`;
  }

  private generateDayPart(pattern: DayPattern): string {
    switch (pattern.type) {
      case DayPatternType.WEEKLY:
        return this.formatWeekly(pattern.days);
      case DayPatternType.DAILY_EXCEPT:
        return this.formatDailyExcept(pattern.exceptDays);
      case DayPatternType.DATES:
        return this.formatDates(pattern.dates);
      case DayPatternType.DATE_RANGE:
        return this.formatDateRanges(pattern.dateRanges);
      default:
        return '';
    }
  }

  private formatWeekly(days: boolean[]): string {
    const activeDays = days.map((isActive, i) => (isActive ? i : -1)).filter(i => i !== -1);
    
    if (activeDays.length === 0) return "";
    if (activeDays.length === 7) return "Tous les jours";

    const groups: number[][] = [];
    let currentGroup: number[] = [];
    
    for (const dayIndex of activeDays) {
        if (currentGroup.length === 0) {
            currentGroup.push(dayIndex);
        } else {
            const lastDayInGroup = currentGroup[currentGroup.length - 1];
            if (dayIndex === lastDayInGroup + 1) {
                currentGroup.push(dayIndex);
            } else {
                groups.push(currentGroup);
                currentGroup = [dayIndex];
            }
        }
    }
    groups.push(currentGroup);

    return groups.map(group => {
        if (group.length > 2) {
            return `${this.FULL_DAY_NAMES[group[0]]} au ${this.FULL_DAY_NAMES[group[group.length - 1]]}`;
        } else {
            return group.map(dayIndex => this.FULL_DAY_NAMES[dayIndex]).join(', ');
        }
    }).join(', ');
  }

  private formatDailyExcept(exceptDays: boolean[]): string {
    const excluded = exceptDays.map((isExcluded, i) => (isExcluded ? this.FULL_DAY_NAMES[i] : null)).filter(Boolean);
    if (excluded.length === 0) return "Tous les jours";
    if (excluded.length === 7) return ""; // Nothing is active
    return `Tous les jours sauf ${excluded.join(', ')}`;
  }

  private formatDates(dates: string[]): string {
    if (!dates || dates.length === 0) return "";

    const parsedDates = dates.map(d => new Date(d + 'T00:00:00')).sort((a, b) => a.getTime() - b.getTime());

    const monthGroups = parsedDates.reduce((acc, date) => {
      const monthYear = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(date.getDate());
      return acc;
    }, {} as Record<string, number[]>);

    return Object.entries(monthGroups)
      .map(([month, days]) => {
        const year = new Date().getFullYear();
        const monthWithoutYear = month.replace(` ${year}`, '');
        return `${days.join(', ')} ${monthWithoutYear}`;
      })
      .join(', ');
  }

  private formatDateRanges(dateRanges: { start: string, end: string }[]): string {
    if (!dateRanges || dateRanges.length === 0) return "";
    
    return dateRanges
      .map(dateRange => this.formatSingleDateRange(dateRange))
      .filter(str => str !== "")
      .join(', ');
  }

  private formatSingleDateRange(dateRange: { start: string, end: string }): string {
    if (!dateRange.start || !dateRange.end) return "";
    
    const start = new Date(dateRange.start + 'T00:00:00');
    const end = new Date(dateRange.end + 'T00:00:00');

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

    const startMonth = start.toLocaleDateString('fr-FR', { month: 'long' });
    const endMonth = end.toLocaleDateString('fr-FR', { month: 'long' });
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    if (startYear === endYear) {
      if (startMonth === endMonth) {
        return `du ${start.getDate()} au ${end.getDate()} ${startMonth}`;
      } else {
        return `du ${start.getDate()} ${startMonth} au ${end.getDate()} ${endMonth}`;
      }
    } else {
      return `du ${start.toLocaleDateString('fr-FR')} au ${end.toLocaleDateString('fr-FR')}`;
    }
  }

  private generateTimePart(timePattern: { type: TimePatternType, timeSlots?: TimeSlot[] }): string {
    switch (timePattern.type) {
      case TimePatternType.H24:
        return 'H24';
      case TimePatternType.SUNRISE_SUNSET:
        return 'Lever au coucher du soleil';
      case TimePatternType.TIME_RANGE:
        if (!timePattern.timeSlots || timePattern.timeSlots.length === 0) {
          return '';
        }
        return timePattern.timeSlots
          .map(slot => `du ${slot.start.replace(':', 'H')} au ${slot.end.replace(':', 'H')}`)
          .join(' et ');
      default:
        return '';
    }
  }
}