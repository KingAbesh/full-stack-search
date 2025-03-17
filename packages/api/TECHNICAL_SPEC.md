# API Package Technical Specification

## 1. Introduction

### 1.1 Purpose

This document outlines the technical specifications for the API package of the Full Stack Search application. The API provides a robust, scalable, and performant backend service for searching and managing accommodation-related data using MongoDB aggregation pipelines.

### 1.2 Scope

The API package handles:

- Full-text search across multiple collections using MongoDB aggregation
- Individual entity retrieval (hotels, cities, countries)
- Request validation and error handling
- Security and CORS configuration
- Logging and monitoring

### 1.3 Target Audience

- Backend developers
- Frontend developers
- DevOps engineers
- System administrators
- Technical stakeholders

## 2. System Architecture

### 2.1 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **Testing**: Jest
- **Validation**: Joi
- **Logging**: Winston
- **Security**: Helmet, CORS

### 2.2 System Components

```
API Package
├── Express Application (app.ts)
├── Routes (routes/)
├── Controllers (controllers/)
├── Services (services/)
├── Datastores (datastores/)
├── Middleware (middlewares/)
├── Utils (utils/)
├── Schemas (schemas/)
└── Entities (entities/)
```

### 2.3 Data Flow

1. **Request Processing**

   ```
   Client → Express → Middleware → Route → Controller → Service → MongoDB Aggregation → Database
   ```

2. **Response Processing**
   ```
   Database → Service → Controller → Response Middleware → Client
   ```

## 3. API Endpoints

### 3.1 Search Endpoints

#### 3.1.1 Global Search

```
GET /api/search
```

**Parameters:**

- `query` (string, required): Search term

**Response:**

```typescript
{
  query: string;
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
}
```

### 3.2 Entity Endpoints

#### 3.2.1 Hotels

```
GET /api/hotels/:id
```

**Parameters:**

- `id` (string, required): Hotel ID

**Response:**

```typescript
{
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
```

#### 3.2.2 Cities

```
GET /api/cities/:id
```

**Parameters:**

- `id` (string, required): City ID

**Response:**

```typescript
{
  _id: string;
  name: string;
}
```

#### 3.2.3 Countries

```
GET /api/countries/:id
```

**Parameters:**

- `id` (string, required): Country ID

**Response:**

```typescript
{
  _id: string;
  country: string;
  countryisocode?: string;
}
```

## 4. Data Models

### 4.1 Hotel Model

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
```

### 4.2 City Model

```typescript
interface City {
  _id: string;
  name: string;
}
```

### 4.3 Country Model

```typescript
interface Country {
  _id: string;
  country: string;
  countryisocode?: string;
}
```

## 5. Error Handling

### 5.1 Error Types

1. **ValidationError**

   ```typescript
   {
     status: 400;
     message: string;
     errors: ValidationError[];
   }
   ```

2. **NotFoundError**

   ```typescript
   {
     status: 404;
     message: string;
   }
   ```

3. **DatabaseError**

   ```typescript
   {
     status: 500;
     message: string;
     error: any;
   }
   ```

4. **ApiError**
   ```typescript
   {
     status: number;
     message: string;
     error?: any;
   }
   ```

### 5.2 Error Codes

- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error
- 503: Service Unavailable

## 6. Performance Requirements

### 6.1 Response Times

- Search API: < 200ms
- Entity retrieval: < 100ms
- Health check: < 50ms

### 6.2 Search Implementation

- MongoDB aggregation pipelines
- Parallel search execution
- Result limiting (10 per collection)
- Scoring system for ranking
- Case-insensitive search

### 6.3 Database Optimization

- Proper indexing
- Efficient aggregation pipelines
- Result limiting
- Query optimization

## 7. Security Requirements

### 7.1 CORS Configuration

```typescript
{
  origin: string;
  credentials: boolean;
  methods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  maxAge: number;
}
```

### 7.2 Security Headers

- Helmet middleware
- CORS protection
- Input validation
- Error handling

### 7.3 Error Handling

- No sensitive information in errors
- Proper error logging
- Client-friendly error messages

## 8. Testing Requirements

### 8.1 Unit Tests

- Service layer tests
- Controller layer tests
- Utility function tests
- Schema validation tests

### 8.2 Integration Tests

- API endpoint tests
- MongoDB integration tests
- Error handling tests

### 8.3 Test Coverage

- Minimum 80% code coverage
- 100% coverage for critical paths
- Edge case coverage

## 9. Monitoring and Logging

### 9.1 Logging Requirements

- Request/response logging
- Error logging
- Search pattern logging
- Result count logging

### 9.2 Metrics

- Response times
- Error rates
- Search result counts
- Database query times

### 9.3 Health Checks

- Database connectivity
- API endpoints
- System resources

## 10. Deployment Requirements

### 10.1 Environment Variables

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/accommodation
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### 10.2 Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "joi": "^17.0.0",
    "winston": "^3.8.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "dotenv-flow": "^3.2.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "jest": "^29.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

### 10.3 Build Process

1. Install dependencies
2. Set environment variables
3. Build TypeScript
4. Start application
5. Monitor logs

## 11. Future Enhancements

### 11.1 Planned Features

- Advanced search filters
- Pagination support
- Cache implementation
- Analytics dashboard

### 11.2 Performance Optimizations

- Query optimization
- Index optimization
- Load balancing
- Database indexing

### 11.3 Security Enhancements

- Authentication
- Authorization
- API key management
- Rate limiting
