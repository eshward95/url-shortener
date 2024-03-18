# Simple URL Shortener-Linkly

This project is a simple URL shortener developed as part of the John Crickett coding challenge [link](https://codingchallenges.fyi/challenges/challenge-url-shortener/). It's built with Node.js and Express for the server-side, MongoDB with Mongoose for the database, and uses React with Vite on the client-side. The application's styling is powered by Tailwind CSS and additional UI customizations from shadcn.

## About The Project

The URL shortener aims to convert long URLs into easily manageable short links that redirect users to the original web addresses. This particular implementation serves as an excellent learning tool for understanding the mechanics behind URL shortening services.

To gain insight into the design decisions and architecture, you can review the design document:

[Design Document](https://sheer-guitar-599.notion.site/URL-Shortener-a4dd3a3a3117421fbe6263c2d184862c?pvs=4)

## Screenshot
**Dark**
![Dark](https://github.com/eshward95/url-shortener/blob/main/frontend/screenshots/dark.png?raw=true)

**Light**
![Light](https://github.com/eshward95/url-shortener/blob/main/frontend/screenshots/light.png?raw=true)


### Technologies Used

- **Express**
- **MongoDB** 
- **Mongoose**
- **React**
- **Vite**
- **Tailwind CSS**
- **shadcn**

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm (`npm` comes installed with Node.js)
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/eshward95/url-shortener.git
   ```

2. Install NPM packages for both the server and the client applications:
   ```sh
   # Install server dependencies
   cd backend
   npm install

   # Install client dependencies
   cd frontend
   npm install
   ```

3. Start the MongoDB service locally.

4. Configure your environment variables in a `.env` file within the server directory.

5. Run the server and client apps:
   ```sh
   # In the server directory
   npm start

   # In a new terminal, in the client directory
   npm run dev
   ```

Your application should now be running on localhost.

#### Frontend Hosting: Vercel
#### Backend Hosting: Render

## Features

## API Endpoints Overview

Below are the primary endpoints for interacting with the URL shortener service:

- `GET /all` - Retrieves a list of all shortened URLs.
- `POST /generate` - Generates a new short URL from a long URL provided in the request body.
- `GET /{short_url_id}` - Redirects to the original URL corresponding to the {short_url_id}.
- `DELETE /{short_url_id}` - Deletes the shortened URL specified by the {short_url_id}.

## Detailed Endpoint Descriptions

### List All URLs

**Request:**
```
GET /all
```

**Response:**
```json
[
  {
    "id": "unique_short_id",
    "long_url": "https://www.example.com/longurlpath",
    "short_url": "https://{hostname}/unique_short_id"
  },
  ...
]
```

### Generate Short URL

**Request:**
```
POST /generate
Content-Type: application/json

{
  "long_url": "https://www.example.com/longurlpath"
}
```

**Response:**
If the URL doesn't already exist:

```json
{
  "id": "generated_short_id",
  "long_url": "https://www.example.com/longurlpath",
  "short_url": "https://{hostname}/generated_short_id",
  "message": "Short URL created successfully.",
  "existing":false,
}
```

If the URL already exists:

```json
{
  "id": "existing_short_id",
  "long_url": "https://www.example.com/longurlpath",
  "short_url": "https://{hostname}/existing_short_id",
  "message": "URL already exists."
  "existing":true,
}
```
*The user will be scrolled to the list item where the existing short URL is displayed, along with an info message.*

### Redirect to Long URL

**Request:**
```
GET /{short_url_id}
```

**Response:**
- HTTP `302 Found`: The server redirects the client to the long URL.

### Delete Short URL

**Request:**
```
DELETE /{short_url_id}
```

**Response:**
```json
{
  "message": "Short URL deleted successfully."
}
```

## Error Handling

Error responses are typically sent with a non-2xx HTTP status code. Common error statuses include `400 Bad Request`, `404 Not Found`, or `500 Internal Server Error`. The response body in case of errors usually includes a `message` field explaining the nature of the error.

**Example Error Response:**
```json
{
  "message": "An error occurred while processing your request."
}
```
## Screenshot

