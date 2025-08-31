# Tonale

A React Native music theory learning app built with Expo.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start


```



## 📱 Development Workflow

### Local Development
```bash
# Start development server
npm start
```

## 🔄 CI/CD Workflow

### Branch Strategy
- **Development branches** → Staging environment
- **Staging branch** → Production environment

### GitHub Actions
- **staging.yml**: Creates PR comments when staging PR is created
- **production.yml**: Creates PR comments when production PR is created
- **auto-pr-to-main.yml**: Auto-creates PR from staging to main

## 🔧 Configuration Files

- `app.json` - App configuration

## 📋 Prerequisites

- Node.js 18+
- Expo CLI

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web

# Lint code
npm run lint
```
