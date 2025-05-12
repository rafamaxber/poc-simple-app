# Table with Filter

A modern React application that implements a product table with advanced filtering capabilities. Built with TypeScript, Vite, and modern React practices.

## 🚀 Features

- Product listing with filtering capabilities
- Real-time search functionality
- Pagination support
- Responsive design
- Dark/Light mode support
- URL-based filter state management
- Type-safe development with TypeScript

## 📦 Tech Stack

```mermaid
graph TD
    A[Table with Filter] --> B[Frontend]
    B --> C[React 19]
    B --> D[TypeScript]
    B --> E[Vite]
    B --> F[State Management]
    F --> G[Zustand]
    B --> H[Data Fetching]
    H --> I[TanStack Query]
    B --> J[Routing]
    J --> K[React Router]
    B --> L[Styling]
    L --> M[CSS Modules]
```

## 🏗️ Project Structure

```mermaid
graph TD
    A[src] --> B[components]
    A --> C[store]
    A --> D[api]
    B --> E[Container.tsx]
    B --> F[Header.tsx]
    B --> G[Filters.tsx]
    B --> H[Table.tsx]
    C --> I[filters.ts]
    D --> J[ProductApi.ts]
    D --> K[types.ts]
```

## 🔄 Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Filters
    participant S as Store
    participant A as API
    participant T as Table

    U->>F: Interact with filters
    F->>S: Update filter state
    S->>A: Fetch products
    A->>T: Update table data
    T->>U: Display results
```

## 🛠️ Setup and Installation

1. Clone the repository
2. Install dependencies:
```bash
bun install
```
3. Start the development server:
```bash
bun run dev
```

## 📝 API Integration

The application integrates with the DummyJSON API for product data. The API supports:

- Search functionality
- Pagination
- Field selection
- Limit control

### API Types

```mermaid
classDiagram
    class ProductFilters {
        +string? q
        +number? limit
        +string[]? select
        +number? skip
    }
    
    class Product {
        +number id
        +string title
        +string description
        +number price
        +string[] images
        +string category
        +number stock
    }
    
    class ProductResponse {
        +Product[] products
        +number total
        +number skip
        +number limit
    }
    
    ProductResponse --> Product
    ProductFilters --> ProductResponse
```

## 🎨 Component Architecture

### Filters Component
- Manages search queries
- Handles field selection
- Controls pagination
- Updates URL parameters

### Table Component
- Displays product data
- Implements responsive grid layout
- Shows product images and details
- Handles loading states

## 🔒 State Management

The application uses Zustand for state management, with a focus on:

- URL synchronization
- Filter state persistence
- Real-time updates
- Type-safe state management

```mermaid
stateDiagram-v2
    [*] --> Initial
    Initial --> Filtering: User Input
    Filtering --> URLUpdate: State Change
    URLUpdate --> DataFetch: URL Change
    DataFetch --> TableUpdate: New Data
    TableUpdate --> Filtering: User Input
```

## 🎯 Development Guidelines

1. **TypeScript**: Maintain strict type checking
2. **Component Structure**: Follow functional component patterns
3. **State Management**: Use Zustand for global state
4. **Styling**: Implement CSS Modules for component styles
5. **API Integration**: Use TanStack Query for data fetching

## 📚 Dependencies

- React 19.1.0
- TypeScript
- Vite
- Zustand 5.0.3
- TanStack Query 5.75.0
- React Router 7.5.3
- ESLint
- CSS Modules

## 🔄 Development Workflow

```mermaid
graph LR
    A[Development] --> B[Linting]
    B --> C[Type Checking]
    C --> D[Build]
    D --> E[Preview]
    E --> F[Deploy]
```

## 📄 License

MIT License - feel free to use this project as a template for your own applications.
