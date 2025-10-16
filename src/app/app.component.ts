import { Component } from '@angular/core';
import { ScheduleRule, DayPatternType, TimePatternType } from './models/schedule.model';
import { ScheduleGeneratorService } from './services/schedule-generator.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  scheduleRules: ScheduleRule[] = [];
  saveStatus: 'idle' | 'saving' | 'success' | 'error' = 'idle';
  saveMessage: string = '';
  
  get generatedScheduleString(): string {
    return this.scheduleGeneratorService.generate(this.scheduleRules);
  }

  constructor(
    private scheduleGeneratorService: ScheduleGeneratorService,
    private apiService: ApiService
  ) {
    this.addRule();
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
    this.scheduleRules = [...this.scheduleRules, newRule];
  }

  removeRule(idToRemove: number): void {
    this.scheduleRules = this.scheduleRules.filter(rule => rule.id !== idToRemove);
  }

  updateRule(updatedRule: ScheduleRule): void {
    this.scheduleRules = this.scheduleRules.map(rule => 
      rule.id === updatedRule.id ? updatedRule : rule
    );
  }

  trackByRuleId(index: number, rule: ScheduleRule): number {
    return rule.id;
  }

  saveToAPI(): void {
    const rules = this.scheduleRules;
    
    if (rules.length === 0) {
      this.saveStatus = 'error';
      this.saveMessage = 'Aucune règle à sauvegarder';
      return;
    }

    this.saveStatus = 'saving';
    this.saveMessage = 'Sauvegarde en cours...';

    this.apiService.saveScheduleRules(rules).subscribe(
      (response) => {
        console.log('Règles sauvegardées avec succès:', response);
        this.saveStatus = 'success';
        this.saveMessage = 'Règles sauvegardées avec succès !';
        
        setTimeout(() => {
          this.saveStatus = 'idle';
          this.saveMessage = '';
        }, 3000);
      },
      (error) => {
        console.error('Erreur lors de la sauvegarde:', error);
        this.saveStatus = 'error';
        this.saveMessage = 'Erreur lors de la sauvegarde';
        
        setTimeout(() => {
          this.saveStatus = 'idle';
          this.saveMessage = '';
        }, 5000);
      }
    );
  }
}
