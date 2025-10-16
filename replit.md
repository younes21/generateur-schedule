# Overview

This is a NOTAM (Notice to Airmen) Schedule Generator application built with Angular 20. The application helps users create and format aviation schedule rules according to NOTAM Field D specifications. Users can define multiple scheduling rules by selecting day patterns (weekly, specific dates, date ranges, or daily exceptions) and time patterns (24-hour, time ranges, or sunrise/sunset), which are then automatically formatted into the proper NOTAM schedule string format in French.

**Status**: Successfully imported and configured for Replit environment (October 16, 2025)

**Latest Update**: DATE_RANGE pattern now supports multiple date intervals (October 16, 2025)

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Framework
- **Technology**: Angular 20 with standalone components
- **Rendering**: Zoneless change detection using `provideZonelessChangeDetection()`
- **Rationale**: Modern Angular architecture eliminates the need for zone.js, improving performance and reducing bundle size
- **Styling**: Tailwind CSS via CDN for rapid UI development without build configuration

## Component Architecture
- **Pattern**: Signal-based reactive state management
- **Main Component** (`AppComponent`): Manages the collection of schedule rules using signals and computed values
- **Child Component** (`ScheduleRuleComponent`): Handles individual rule editing with local state synchronization
- **Communication**: Output events for parent-child communication; input signals for data flow
- **Change Detection**: OnPush strategy for optimal performance

## State Management
- **Approach**: Angular signals for reactive state
- **Implementation**: 
  - `scheduleRules` signal holds the array of rules
  - `generatedScheduleString` computed signal automatically updates when rules change
  - Local signals in child components for form state management
- **Benefits**: Automatic dependency tracking, fine-grained reactivity, no need for manual change detection

## Data Models
- **Discriminated Unions**: TypeScript discriminated unions for day and time pattern types
- **Type Safety**: Strong typing for all schedule patterns with enums and interfaces
- **Patterns**:
  - Day Patterns: WEEKLY, DATES, DATE_RANGE (supports multiple intervals), DAILY_EXCEPT
  - Time Patterns: H24, TIME_RANGE, SUNRISE_SUNSET

## Service Layer
- **ScheduleGeneratorService**: Core business logic for converting rule objects into NOTAM-formatted strings
- **Responsibilities**: 
  - Rule-to-string generation
  - Day pattern formatting (French day names, date ranges)
  - Time slot formatting
  - Rule composition and concatenation
- **Injection**: Provided at root level for singleton behavior

## Localization
- **Locale**: French (fr) configured at bootstrap
- **Implementation**: Angular's built-in i18n with French locale data registered
- **Scope**: Date formatting and day name display

## Module System
- **Build Tool**: Angular CLI with esbuild-based application builder
- **Module Resolution**: ESM with bundler resolution strategy
- **Development Server**: Angular dev server on port 5000
- **Import Maps**: Used for external dependencies (RxJS, Angular packages) loaded from CDN

# External Dependencies

## Core Framework
- **Angular 20.3.x**: Complete framework suite including core, common, compiler, forms, and platform-browser
- **RxJS 7.8.2**: Reactive programming library (loaded via CDN import maps)

## Build & Development Tools
- **@angular/cli**: Command-line interface for Angular development
- **@angular/build**: Modern esbuild-based build system
- **TypeScript 5.8.2**: Type system and compiler
- **Vite 6.2.0**: Dev dependency for potential alternative build scenarios

## Styling
- **Tailwind CSS**: Utility-first CSS framework (loaded via CDN)

## Runtime Environment
- **Node.js 20**: Development and build environment
- **http-server**: Static file server for production deployment

## Replit Configuration
- **Development Server**: Configured to run on 0.0.0.0:5000
- **Host Configuration**: 
  - Angular dev server configured with `allowedHosts: ["all"]` in angular.json
  - Vite server configured with `allowedHosts: ['all']` in vite.config.js for Replit proxy compatibility
- **Workflow**: Angular Dev Server workflow set up to run `npm run dev`
- **Deployment**: Configured for autoscale deployment with:
  - Build command: `npm run build`
  - Run command: `npx http-server dist -p 5000`
- **Analytics**: Angular CLI analytics disabled for non-interactive environment

## Original Platform
- **AI Studio**: Originally deployed at https://ai.studio/apps/drive/1Ava4gf6X1tm92dXfR3LIzOq4TYspZJHW