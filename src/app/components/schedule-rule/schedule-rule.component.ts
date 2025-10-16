import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ScheduleRule, DayPattern, DayPatternType, TimePatternType, TimeSlot } from '../../models/schedule.model';

@Component({
  selector: 'app-schedule-rule',
  templateUrl: './schedule-rule.component.html',
  styleUrls: []
})
export class ScheduleRuleComponent implements OnChanges {
  @Input() rule!: ScheduleRule;
  @Output() remove = new EventEmitter<number>();
  @Output() ruleChange = new EventEmitter<ScheduleRule>();

  localRule: ScheduleRule | null = null;
  
  newDate = '';

  dayLabels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  dayPatternTypeLabels = {
    [DayPatternType.WEEKLY]: 'Hebdomadaire (Jours de la semaine)',
    [DayPatternType.DATES]: 'Dates spécifiques',
    [DayPatternType.DATE_RANGE]: 'Plage de dates',
    [DayPatternType.DAILY_EXCEPT]: 'Tous les jours sauf...',
  };
  dayPatternTypes = Object.keys(this.dayPatternTypeLabels) as DayPatternType[];
  timePatternTypes = Object.values(TimePatternType);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rule'] && changes['rule'].currentValue) {
      this.localRule = JSON.parse(JSON.stringify(this.rule));
    }
  }

  emitChange(): void {
    if (this.localRule) {
      this.ruleChange.emit(this.localRule);
    }
  }

  onDayPatternTypeChange(newType: DayPatternType): void {
    if (!this.localRule || this.localRule.dayPattern.type === newType) return;

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
    this.localRule.dayPattern = newDayPattern;
    this.emitChange();
  }
  
  onTimePatternTypeChange(newType: TimePatternType): void {
    if (!this.localRule) return;
    
    this.localRule.timePattern.type = newType;
    
    if (newType === TimePatternType.TIME_RANGE && (!this.localRule.timePattern.timeSlots || this.localRule.timePattern.timeSlots.length === 0)) {
      this.localRule.timePattern.timeSlots = [{ start: '08:00', end: '14:00' }];
    } else if (newType !== TimePatternType.TIME_RANGE) {
      delete this.localRule.timePattern.timeSlots;
    }
    this.emitChange();
  }

  toggleDay(dayIndex: number): void {
    if (this.localRule?.dayPattern.type === DayPatternType.WEEKLY) {
      this.localRule.dayPattern.days[dayIndex] = !this.localRule.dayPattern.days[dayIndex];
      this.emitChange();
    }
  }

  toggleExceptDay(dayIndex: number): void {
    if (this.localRule?.dayPattern.type === DayPatternType.DAILY_EXCEPT) {
      this.localRule.dayPattern.exceptDays[dayIndex] = !this.localRule.dayPattern.exceptDays[dayIndex];
      this.emitChange();
    }
  }

  addDate(): void {
    if (this.localRule?.dayPattern.type === DayPatternType.DATES && this.newDate) {
      if (!this.localRule.dayPattern.dates.includes(this.newDate)) {
        this.localRule.dayPattern.dates.push(this.newDate);
        this.localRule.dayPattern.dates.sort();
        this.emitChange();
      }
      this.newDate = '';
    }
  }

  removeDate(dateToRemove: string): void {
    if (this.localRule?.dayPattern.type === DayPatternType.DATES) {
      this.localRule.dayPattern.dates = this.localRule.dayPattern.dates.filter(d => d !== dateToRemove);
      this.emitChange();
    }
  }

  addTimeSlot(): void {
    if (this.localRule?.timePattern.timeSlots) {
      this.localRule.timePattern.timeSlots.push({ start: '18:00', end: '21:00' });
      this.emitChange();
    }
  }

  removeTimeSlot(index: number): void {
    if (this.localRule?.timePattern.timeSlots) {
      this.localRule.timePattern.timeSlots.splice(index, 1);
      this.emitChange();
    }
  }
  
  addDateRange(): void {
    if (this.localRule?.dayPattern.type === DayPatternType.DATE_RANGE) {
      this.localRule.dayPattern.dateRanges.push({ start: '', end: '' });
      this.emitChange();
    }
  }

  removeDateRange(index: number): void {
    if (this.localRule?.dayPattern.type === DayPatternType.DATE_RANGE && this.localRule.dayPattern.dateRanges.length > 1) {
      this.localRule.dayPattern.dateRanges.splice(index, 1);
      this.emitChange();
    }
  }
  
  emitRemove(): void {
    if (this.localRule) {
      this.remove.emit(this.localRule.id);
    }
  }
  
  trackByIndex(index: number): number {
    return index;
  }
}
