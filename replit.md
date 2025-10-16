# Overview

This is a NOTAM (Notice to Airmen) Schedule Generator application built with Angular 11. The application helps users create and format aviation schedule rules according to NOTAM Field D specifications. Users can define multiple scheduling rules by selecting day patterns (weekly, specific dates, date ranges, or daily exceptions) and time patterns (24-hour, time ranges, or sunrise/sunset), which are then automatically formatted into the proper NOTAM schedule string format in French.

**Status**: Successfully migrated to Angular 11 and configured for Replit environment (October 16, 2025)

**Latest Update**: Migrated from Angular 20 to Angular 11 with NgModule architecture (October 16, 2025)

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Framework
- **Technology**: Angular 11 with NgModule architecture
- **Rendering**: Zone.js-based change detection (standard Angular 11 approach)
- **Module System**: Traditional NgModule with BrowserModule, FormsModule, and HttpClientModule
- **Styling**: Tailwind CSS via CDN for rapid UI development without build configuration

## Component Architecture
- **Pattern**: Classic component state management with properties and EventEmitters
- **Main Component** (`AppComponent`): Manages the collection of schedule rules using a regular array with immutable updates
- **Child Component** (`ScheduleRuleComponent`): Handles individual rule editing with @Input/@Output decorators and OnChanges lifecycle
- **Communication**: EventEmitter for parent-child communication; @Input decorators for data flow
- **Change Detection**: Default change detection strategy

## State Management
- **Approach**: Classic Angular state management with component properties
- **Implementation**: 
  - `scheduleRules` array holds the rules with immutable update pattern
  - `generatedScheduleString` computed via getter that calls the service
  - Local properties in child components for form state management with ngModel
- **Benefits**: Simple, proven pattern compatible with Angular 11

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

- **ApiService**: HTTP service for saving and loading schedule rules via API (Added: October 16, 2025)
- **Responsibilities**:
  - POST requests to save schedule rules with timestamp and optional userId
  - GET requests to retrieve saved schedule rules
  - HTTP headers configuration (Content-Type, optional Authorization)
- **Current Configuration**: Uses JSONPlaceholder as a mock API endpoint for testing
- **Integration**: HttpClientModule imported in AppModule
- **UI Integration**: "Sauvegarder vers l'API" button with loading states (idle, saving, success, error)

## Localization
- **Locale**: French (fr) configured in AppModule
- **Implementation**: Angular's built-in i18n with French locale data registered via registerLocaleData and LOCALE_ID provider
- **Scope**: Date formatting and day name display

## Module System
- **Build Tool**: Angular CLI with webpack-based browser builder
- **Module Resolution**: Node module resolution strategy
- **Development Server**: Angular dev server on port 5000 with disableHostCheck for Replit compatibility
- **Bootstrap**: Traditional platformBrowserDynamic bootstrapping with AppModule

## Node.js Compatibility
- **Issue**: Angular 11 uses webpack 4, which is incompatible with Node.js 17+ (OpenSSL 3.0)
- **Solution**: NODE_OPTIONS=--openssl-legacy-provider flag in npm scripts to enable legacy OpenSSL provider
- **Rationale**: Allows Angular 11 to run on Node.js 20 in Replit environment

# External Dependencies

## Core Framework
- **Angular 11.2.14**: Complete framework suite including core, common, compiler, forms, platform-browser, and platform-browser-dynamic
- **RxJS 6.6.7**: Reactive programming library (included in node_modules)
- **Zone.js 0.11.4**: Zone-based change detection library
- **tslib 2.0.0**: TypeScript helper library

## Build & Development Tools
- **@angular/cli 11.2.18**: Command-line interface for Angular development
- **@angular-devkit/build-angular 0.1102.18**: Webpack-based browser builder
- **TypeScript 4.1.6**: Type system and compiler
- **@types/node 12.11.1**: Node.js type definitions

## Styling
- **Tailwind CSS**: Utility-first CSS framework (loaded via CDN)

## Runtime Environment
- **Node.js 20**: Development and build environment (with OpenSSL legacy provider workaround)

## Replit Configuration
- **Development Server**: Configured to run on 0.0.0.0:5000
- **Host Configuration**: 
  - Angular dev server configured with `disableHostCheck: true` in angular.json for Replit proxy compatibility
- **Workflow**: Angular Dev Server workflow set up to run `npm run dev` with NODE_OPTIONS=--openssl-legacy-provider
- **Analytics**: Angular CLI analytics disabled for non-interactive environment

## Migration History
- **October 16, 2025**: Migrated from Angular 20 (standalone components, signals) to Angular 11 (NgModule, classic state management)
- **Key Changes**:
  - Replaced standalone components with NgModule architecture
  - Converted signals to regular component properties
  - Migrated template syntax from @if/@for to *ngIf/*ngFor
  - Updated build system from esbuild to webpack
  - Added OpenSSL legacy provider workaround for Node.js 20 compatibility

## Original Platform
- **AI Studio**: Originally deployed at https://ai.studio/apps/drive/1Ava4gf6X1tm92dXfR3LIzOq4TYspZJHW