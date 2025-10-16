import { Component, ChangeDetectionStrategy, input, output, effect, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleRule, DayPattern, DayPatternType, TimePatternType, TimeSlot } from '../../models/schedule.model';

@Component({
  selector: 'app-schedule-rule',
  templateUrl: './schedule-rule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class ScheduleRuleComponent {
  rule = input.required<ScheduleRule>();
  remove = output<number>();
  ruleChange = output<ScheduleRule>();

  // Local writable signal to manage the form state
  localRule: WritableSignal<ScheduleRule | null> = signal(null);
  
  newDate = ''; // for ngModel of the date input

  dayLabels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  // For the UI selectors
  dayPatternTypeLabels = {
    [DayPatternType.WEEKLY]: 'Hebdomadaire (Jours de la semaine)',
    [DayPatternType.DATES]: 'Dates spécifiques',
    [DayPatternType.DATE_RANGE]: 'Plage de dates',
    [DayPatternType.DAILY_EXCEPT]: 'Tous les jours sauf...',
  };
  dayPatternTypes = Object.keys(this.dayPatternTypeLabels) as DayPatternType[];
  timePatternTypes = Object.values(TimePatternType);
  

  constructor() {
    effect(() => {
      // Clone the input rule to avoid direct mutation
      this.localRule.set(JSON.parse(JSON.stringify(this.rule())));
    });
  }

  emitChange(): void {
    const currentRule = this.localRule();
    if (currentRule) {
      this.ruleChange.emit(currentRule);
    }
  }

  onDayPatternTypeChange(newType: DayPatternType): void {
    const rule = this.localRule();
    if (!rule || rule.dayPattern.type === newType) return;

    // Reset day pattern based on new type
    let newDayPattern: DayPattern;
    switch (newType) {
      case DayPatternType.WEEKLY:
        newDayPattern = { type: DayPatternType.WEEKLY, days: [false, false, false, false, false, false, false] };
        break;
      case DayPatternType.DATES:
        newDayPattern = { type: DayPatternType.DATES, dates: [] };
        break;
      case DayPatternType.DATE_RANGE:
        newDayPattern = { type: DayPatternType.DATE_RANGE, dateRanges: [{ start: '', end: '' }] };
        break;
      case DayPatternType.DAILY_EXCEPT:
        newDayPattern = { type: DayPatternType.DAILY_EXCEPT, exceptDays: [false, false, false, false, false, false, false] };
        break;
    }
    rule.dayPattern = newDayPattern;
    this.emitChange();
  }
  
  onTimePatternTypeChange(newType: TimePatternType): void {
      const rule = this.localRule();
      if (!rule) return;
      
      rule.timePattern.type = newType;
      
      if(newType === TimePatternType.TIME_RANGE && (!rule.timePattern.timeSlots || rule.timePattern.timeSlots.length === 0)) {
          rule.timePattern.timeSlots = [{ start: '08:00', end: '14:00' }];
      } else if (newType !== TimePatternType.TIME_RANGE) {
          delete rule.timePattern.timeSlots;
      }
      this.emitChange();
  }

  toggleDay(dayIndex: number): void {
    const rule = this.localRule();
    if (rule?.dayPattern.type === DayPatternType.WEEKLY) {
      rule.dayPattern.days[dayIndex] = !rule.dayPattern.days[dayIndex];
      this.emitChange();
    }
  }

  toggleExceptDay(dayIndex: number): void {
     const rule = this.localRule();
    if (rule?.dayPattern.type === DayPatternType.DAILY_EXCEPT) {
      rule.dayPattern.exceptDays[dayIndex] = !rule.dayPattern.exceptDays[dayIndex];
      this.emitChange();
    }
  }

  addDate(): void {
    const rule = this.localRule();
    if (rule?.dayPattern.type === DayPatternType.DATES && this.newDate) {
      if (!rule.dayPattern.dates.includes(this.newDate)) {
        rule.dayPattern.dates.push(this.newDate);
        rule.dayPattern.dates.sort();
        this.emitChange();
      }
      this.newDate = ''; // Reset input
    }
  }

  removeDate(dateToRemove: string): void {
    const rule = this.localRule();
    if (rule?.dayPattern.type === DayPatternType.DATES) {
      rule.dayPattern.dates = rule.dayPattern.dates.filter(d => d !== dateToRemove);
      this.emitChange();
    }
  }

  addTimeSlot(): void {
    const rule = this.localRule();
    if (rule?.timePattern.timeSlots) {
      rule.timePattern.timeSlots.push({ start: '18:00', end: '21:00' });
      this.emitChange();
    }
  }

  removeTimeSlot(index: number): void {
    const rule = this.localRule();
    if (rule?.timePattern.timeSlots) {
      rule.timePattern.timeSlots.splice(index, 1);
      this.emitChange();
    }
  }
  
  addDateRange(): void {
    const rule = this.localRule();
    if (rule?.dayPattern.type === DayPatternType.DATE_RANGE) {
      rule.dayPattern.dateRanges.push({ start: '', end: '' });
      this.emitChange();
    }
  }

  removeDateRange(index: number): void {
    const rule = this.localRule();
    if (rule?.dayPattern.type === DayPatternType.DATE_RANGE && rule.dayPattern.dateRanges.length > 1) {
      rule.dayPattern.dateRanges.splice(index, 1);
      this.emitChange();
    }
  }
  
  emitRemove(): void {
      const rule = this.localRule();
      if(rule) {
          this.remove.emit(rule.id);
      }
  }
}