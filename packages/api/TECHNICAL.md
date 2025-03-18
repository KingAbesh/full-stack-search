# API Package Technical Documentation

## Overview

The API package is a Node.js/Express application that provides a RESTful API for searching and retrieving accommodation-related data. It uses TypeScript for type safety and includes features like MongoDB aggregation pipelines, comprehensive error handling, and request validation using Joi.

## Architecture

### Core Components

1. **Express Application (`app.ts`)**

   - Main application entry point
   - Configures middleware and routes
   - Handles error responses
   - CORS and security configuration
   - Database connection management

2. **Routes (`routes/`)**

   - `index.ts`: Main router configuration
   - Search and entity endpoints
   - Request validation middleware

3. **Controllers (`controllers/`)**

   - `search.controller.ts`: Search logic implementation
   - `entity.controller.ts`: Entity-specific operations
   - Async error handling with express-async-handler

4. **Services (`services/`)**

   - `search.service.ts`: Complex search logic with MongoDB aggregation
   - Entity-specific business logic
   - Scoring and ranking implementation

5. **Datastores (`datastores/`)**

   - MongoDB connection management
   - Database models
   - Seeding functionality

6. **Middleware (`middlewares/`)**

   - `error.middleware.ts`: Global error handling
   - `validate.middleware.ts`: Request validation using Joi
   - `request-logger.middleware.ts`: Request logging

7. **Utils (`utils/`)**

   - `logger.ts`: Winston logging implementation
   - `response.ts`: Response formatting utilities
   - Error handling utilities

8. **Schemas (`schemas/`)**

   - Joi validation schemas
   - Request/response type definitions

### Data Flow

1. **Request Flow**

   ```
   Client Request → Express Middleware → Route Handler → Controller → Service → MongoDB Aggregation → Database
   ```

2. **Response Flow**
   ```
   Database → Service → Controller → Response Middleware → Client
   ```

## Key Features

### Search Functionality

- Full-text search using MongoDB aggregation pipelines
- Scoring system for result ranking
- Parallel search across multiple collections
- Case-insensitive search
- Result limiting (10 results per collection)

### Entity Management

- Individual entity retrieval (hotels, cities, countries)
- Input validation using Joi
- Error handling with custom error classes
- Response formatting

### Performance Optimizations

- MongoDB aggregation pipelines
- Parallel search execution
- Efficient database queries
- Result limiting

### Security

- CORS configuration
- Helmet security headers
- Input validation
- Error handling
- Request logging

## Testing

### Test Structure

- Unit tests for services and controllers
- Integration tests for API endpoints
- MongoDB memory server for testing
- Test utilities and helpers

### Test Coverage

- API endpoints
- Error handling
- Edge cases
- Search functionality

## Error Handling

### Error Types

1. **ValidationError**

   - Invalid input data
   - Missing required fields
   - Format errors

2. **NotFoundError**

   - Resource not found
   - Invalid IDs

3. **DatabaseError**

   - Connection issues
   - Query errors

4. **ApiError**
   - Generic API errors
   - Network issues

### Error Response Format

```typescript
interface ApiResponse<T> {
  message: string;
  data: T;
}
```

## Configuration

### Environment Variables

- `PORT`: Server port
- `MONGODB_URI`: MongoDB connection string
- `CORS_ORIGIN`: Allowed CORS origin
- `NODE_ENV`: Environment (development/production)

### API Configuration

- CORS settings
- Request validation
- Response formatting
- Logging configuration

## Dependencies

### Core Dependencies

- `express`: Web framework
- `mongoose`: MongoDB ODM
- `joi`: Schema validation
- `winston`: Logging
- `cors`: CORS middleware
- `helmet`: Security headers
- `dotenv-flow`: Environment configuration

### Development Dependencies

- `typescript`: Type safety
- `jest`: Testing
- `eslint`: Code linting
- `prettier`: Code formatting

## Best Practices

### Code Organization

- Feature-based structure
- Clear separation of concerns
- Consistent naming conventions
- Type safety

### Error Handling

- Centralized error handling
- Detailed error messages
- Proper error logging
- Client-friendly responses

### Performance

- MongoDB aggregation pipelines
- Parallel search execution
- Result limiting
- Request validation

### Security

- CORS configuration
- Helmet security headers
- Input validation
- Error handling
- Request logging

## Deployment

### Requirements

- Node.js environment
- MongoDB database
- Environment variables

### Process

1. Install dependencies
2. Set environment variables
3. Build TypeScript
4. Start application
5. Monitor logs

## Monitoring

### Logging

- Request/response logging
- Error logging
- Search pattern logging
- Result count logging

### Health Checks

- Database connectivity
- API endpoints
- System resources

## Future Improvements

1. Implement Redis caching with TTL for search results and frequently accessed data
2. Add pagination and cursor-based navigation for search results
3. Implement JWT authentication and role-based access control
4. Add OpenAPI documentation and API versioning
5. Implement structured logging with request/response tracking
6. Add integration tests and load testing
7. Set up automated deployment pipeline with GitHub Actions
