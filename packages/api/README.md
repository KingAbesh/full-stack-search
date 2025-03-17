# Accommodation Search API

## Base URL

```
http://localhost:3001/api
```

## Endpoints

### Search

```http
GET /search?query={searchTerm}
```

Search for hotels, cities, and countries.

**Query Parameters:**

- `query` (required): Search term (minimum 2 characters)

**Response:**

```json
{
  "success": true,
  "message": "Search completed successfully",
  "data": {
    "hotels": [...],
    "cities": [...],
    "countries": [...]
  }
}
```

### Get Hotel by ID

```http
GET /hotels/{id}
```

Get details of a specific hotel.

**Path Parameters:**

- `id` (required): Hotel ID

**Response:**

```json
{
  "success": true,
  "message": "Hotel fetched successfully",
  "data": {
    "chain_name": "string",
    "hotel_name": "string",
    "addressline1": "string",
    "addressline2": "string",
    "zipcode": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "countryisocode": "string",
    "star_rating": number
  }
}
```

### Get City by ID

```http
GET /cities/{id}
```

Get details of a specific city.

**Path Parameters:**

- `id` (required): City ID

**Response:**

```json
{
  "success": true,
  "message": "City fetched successfully",
  "data": {
    "name": "string"
  }
}
```

### Get Country by ID

```http
GET /countries/{id}
```

Get details of a specific country.

**Path Parameters:**

- `id` (required): Country ID

**Response:**

```json
{
  "success": true,
  "message": "Country fetched successfully",
  "data": {
    "country": "string",
    "countryisocode": "string"
  }
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation error message",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": [...]
  }
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Entity not found",
  "error": {
    "code": "NOT_FOUND"
  }
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error",
  "error": {
    "code": "INTERNAL_SERVER_ERROR"
  }
}
```
