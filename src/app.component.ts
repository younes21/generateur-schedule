
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleRuleComponent } from './components/schedule-rule/schedule-rule.component';
import { ScheduleRule, DayPatternType, TimePatternType } from './models/schedule.model';
import { ScheduleGeneratorService } from './services/schedule-generator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ScheduleRuleComponent],
})
export class AppComponent {
  scheduleRules = signal<ScheduleRule[]>([]);
  
  generatedScheduleString = computed(() => {
    return this.scheduleGeneratorService.generate(this.scheduleRules());
  });

  constructor(private scheduleGeneratorService: ScheduleGeneratorService) {
    this.addRule(); // Start with one rule for better UX
  }

  addRule(): void {
    const newRule: ScheduleRule = {
      id: Date.now(),
      dayPattern: {
        type: DayPatternType.WEEKLY,
        days: [false, false, false, false, false, false, false],
      },
      timePattern: {
        type: TimePatternType.TIME_RANGE,
        timeSlots: [{ start: '08:00', end: '14:00' }],
      },
    };
    this.scheduleRules.update(rules => [...rules, newRule]);
  }

  removeRule(idToRemove: number): void {
    this.scheduleRules.update(rules => rules.filter(rule => rule.id !== idToRemove));
  }

  updateRule(updatedRule: ScheduleRule): void {
    this.scheduleRules.update(rules => 
      rules.map(rule => (rule.id === updatedRule.id ? updatedRule : rule))
    );
  }
}
