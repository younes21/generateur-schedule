
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleRuleComponent } from './components/schedule-rule/schedule-rule.component';
import { ScheduleRule, DayPatternType, TimePatternType } from './models/schedule.model';
import { ScheduleGeneratorService } from './services/schedule-generator.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ScheduleRuleComponent],
})
export class AppComponent {
  scheduleRules = signal<ScheduleRule[]>([]);
  saveStatus = signal<'idle' | 'saving' | 'success' | 'error'>('idle');
  saveMessage = signal<string>('');
  
  generatedScheduleString = computed(() => {
    return this.scheduleGeneratorService.generate(this.scheduleRules());
  });

  constructor(
    private scheduleGeneratorService: ScheduleGeneratorService,
    private apiService: ApiService
  ) {
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

  saveToAPI(): void {
    const rules = this.scheduleRules();
    
    if (rules.length === 0) {
      this.saveStatus.set('error');
      this.saveMessage.set('Aucune règle à sauvegarder');
      return;
    }

    this.saveStatus.set('saving');
    this.saveMessage.set('Sauvegarde en cours...');

    this.apiService.saveScheduleRules(rules).subscribe({
      next: (response) => {
        console.log('Règles sauvegardées avec succès:', response);
        this.saveStatus.set('success');
        this.saveMessage.set('Règles sauvegardées avec succès !');
        
        // Réinitialiser le message après 3 secondes
        setTimeout(() => {
          this.saveStatus.set('idle');
          this.saveMessage.set('');
        }, 3000);
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde:', error);
        this.saveStatus.set('error');
        this.saveMessage.set('Erreur lors de la sauvegarde');
        
        // Réinitialiser le message après 5 secondes
        setTimeout(() => {
          this.saveStatus.set('idle');
          this.saveMessage.set('');
        }, 5000);
      }
    });
  }
}
