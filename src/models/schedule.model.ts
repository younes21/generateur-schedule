export interface ScheduleRule {
  id: number;
  dayPattern: DayPattern;
  timePattern: TimePattern;
}

// --- Day Patterns ---

export enum DayPatternType {
  WEEKLY = 'WEEKLY', // Repeats on specific days of the week
  DATES = 'DATES', // A specific list of dates
  DATE_RANGE = 'DATE_RANGE', // A continuous range of dates
  DAILY_EXCEPT = 'DAILY_EXCEPT', // Every day, except some days of the week
}

// Discriminated union for DayPattern
export type DayPattern =
  | {
      type: DayPatternType.WEEKLY;
      // index 0 is Sunday, 1 is Monday, etc.
      days: boolean[];
    }
  | {
      type: DayPatternType.DATES;
      dates: string[]; // YYYY-MM-DD
    }
  | {
      type: DayPatternType.DATE_RANGE;
      dateRange: { start: string; end: string }; // YYYY-MM-DD
    }
  | {
      type: DayPatternType.DAILY_EXCEPT;
      // index 0 is Sunday, 1 is Monday, etc.
      exceptDays: boolean[];
    };


// --- Time Patterns ---

export enum TimePatternType {
  H24 = 'H24',
  TIME_RANGE = 'TIME_RANGE',
  SUNRISE_SUNSET = 'SUNRISE_SUNSET',
}

export interface TimeSlot {
  start: string; // HH:mm
  end: string;   // HH:mm
}

export interface TimePattern {
  type: TimePatternType;
  timeSlots?: TimeSlot[];
}