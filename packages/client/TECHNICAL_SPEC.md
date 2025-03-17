# Client Package Technical Specification

## Overview

The client package is a React application that provides a user interface for searching and viewing accommodation-related data. It uses TypeScript for type safety and includes features like real-time search, error handling, and request cancellation.

## Architecture

### Core Components

1. **API Client (`src/api/client.ts`)**

   - Base API client implementation
   - Search functionality
   - Entity retrieval
   - Request/response handling
   - Error handling
   - Retry logic
   - Request cancellation

2. **Types (`src/types/`)**

   - TypeScript interfaces
   - API response types
   - Request parameter types

3. **Components (`src/components/`)**

   - Search interface
   - Results display
   - Error handling
   - Loading states

4. **Hooks (`src/hooks/`)**
   - Search functionality
   - Data fetching
   - State management
   - Error handling

### Data Flow

1. **Request Flow**

   ```
   User Input → Component → Hook → API Client → Server
   ```

2. **Response Flow**
   ```
   Server → API Client → Hook → Component → UI
   ```

## Key Features

### Search Functionality

- Real-time search
- Request cancellation
- Error handling
- Loading states
- Result display

### API Client Features

- Retry logic with configurable:
  - Number of retries
  - Retry delay
  - Request timeout
- Request cancellation
- Error handling
- Response formatting

### Error Handling

- Network errors
- API errors
- Request timeouts
- Validation errors
- User feedback

## API Integration

### Request Format

```typescript
interface SearchParams {
  query: string;
  page?: number;
  pageSize?: number;
  signal?: AbortSignal;
}
```

### Response Format

```typescript
interface ApiResponse<T> {
  message: string;
  data: T;
}

interface SearchResponse {
  query: string;
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
}
```

### Entity Types

```typescript
interface Hotel {
  _id: string;
  hotel_name: string;
  chain_name?: string;
  addressline1: string;
  addressline2?: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  star_rating?: number;
}

interface City {
  _id: string;
  name: string;
}

interface Country {
  _id: string;
  country: string;
  countryisocode?: string;
}
```

### Error Types

```typescript
class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    public data: unknown
  ) {
    super();
  }
}
```

## Configuration

### API Configuration

```typescript
const API_CONFIG = {
  baseUrl: "http://localhost:3001/api",
  timeout: 5000,
  retries: 3,
  retryDelay: 1000,
};
```

### Request Headers

```typescript
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

## Dependencies

### Core Dependencies

- `react`: UI framework
- `react-dom`: DOM rendering
- `typescript`: Type safety
- `vite`: Build tool
- `vitest`: Testing

### Development Dependencies

- `@types/react`: React type definitions
- `@types/react-dom`: React DOM type definitions
- `@vitejs/plugin-react`: Vite React plugin
- `eslint`: Code linting
- `prettier`: Code formatting

## Testing

### Test Structure

- Unit tests for components
- Integration tests for hooks
- API client tests
- Error handling tests

### Test Coverage

- Component rendering
- Hook functionality
- API integration
- Error scenarios

## Best Practices

### Code Organization

- Feature-based structure
- Clear separation of concerns
- Consistent naming conventions
- Type safety

### Error Handling

- Centralized error handling
- User-friendly error messages
- Error logging
- Recovery mechanisms

### Performance

- Request cancellation
- Debounced search
- Efficient rendering
- Resource cleanup

### Security

- Input validation
- Error handling
- Secure API communication
- XSS prevention

## Deployment

### Requirements

- Node.js environment
- Build tools
- Environment variables

### Process

1. Install dependencies
2. Set environment variables
3. Build application
4. Deploy static files
5. Monitor performance

## Monitoring

### Error Tracking

- API errors
- Network errors
- User interactions
- Performance metrics

### Analytics

- Search patterns
- User behavior
- Error rates
- Performance metrics

## Future Improvements

### Planned Features

- Advanced search filters
- Pagination
- Caching
- Offline support

### Performance Optimizations

- Code splitting
- Lazy loading
- Bundle optimization
- Resource caching

### Security Enhancements

- HTTPS enforcement
- Input sanitization
- Error masking
- Rate limiting
