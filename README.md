# TarakQL Documentation

> **TarakQL — Query Your REST API, Simply.**

TarakQL is a lightweight query system for REST APIs. It allows API users to select only the data they need from a JSON response using a simple query parameter.

It is designed to be easy for developers who already understand REST APIs.

---

## Features

- Simple REST-style usage
- Select a single field
- Select multiple fields
- Access nested object properties
- Access array items by index
- No schema required
- Lightweight Express middleware
- Works with existing REST API routes

---

# Installation

Install TarakQL in your Express project:

```bash
npm install tarakql
```

Then import it:

```js
import { tarakParser } from "tarakql";
```

# Quick Start

```js
import express from "express";
import { tarakParser } from "tarakql";

const app = express();

app.use(tarakParser);

app.get("/", (req, res) => {
   res.tarakSend({
      name: {
         firstName: "Taraknath",
         lastName: "Karan",
      },
      age: 17,
      village: "Parulia",
      website: ["https://taraknath341.github.io", "https://tarakpro.netlify.app", "https://taraknotes.netlify.app"],
   });
});

app.listen(3000, () => {
   console.log("Server is listening on port 3000");
});
```

Start the server:

```bash
node index.js
```

Your API:

```text
http://localhost:3000
```

---

# How TarakQL Works

TarakQL reads the `tarakQL` query parameter from the URL.

```text
?tarakQL=yourQuery
```

The middleware stores the query, and `res.tarakSend()` selects the requested data from your JSON response.

```text
Request
   ↓
tarakParser
   ↓
Read ?tarakQL=
   ↓
res.tarakSend(data)
   ↓
Selected data returned
```

---

# 1. Get the Complete Response

If you do not provide `tarakQL`, TarakQL returns the complete JSON response.

### Request

```text
GET /
```

### Response

```json
{
   "name": {
      "firstName": "Taraknath",
      "lastName": "Karan"
   },
   "age": 17,
   "village": "Parulia",
   "website": ["https://taraknath341.github.io", "https://tarakpro.netlify.app", "https://taraknotes.netlify.app"]
}
```

---

# 2. Select a Single Field

Use the field name after `tarakQL=`.

### Request

```text
GET /?tarakQL=age
```

### Response

```json
[17]
```

Another example:

```text
GET /?tarakQL=village
```

Response:

```json
["Parulia"]
```

---

# 3. Select Multiple Fields

Separate multiple fields using a comma `,`.

### Request

```text
GET /?tarakQL=age,village
```

### Response

```json
[17, "Parulia"]
```

Spaces after commas are also supported:

```text
GET /?tarakQL=age, village
```

---

# 4. Access Nested Data

Use a dot `.` to access nested object properties.

### Data

```json
{
   "name": {
      "firstName": "Taraknath",
      "lastName": "Karan"
   }
}
```

### Request

```text
GET /?tarakQL=name.firstName
```

### Current Response

```json
["Taraknath"]
```

Another example:

```text
GET /?tarakQL=name.lastName
```

Response:

```json
["Karan"]
```

---

# 5. Combine Normal and Nested Fields

You can combine multiple fields and nested properties.

### Request

```text
GET /?tarakQL=name.firstName,name.lastName,age,village
```

### Response

```json
["Taraknath", "Karan", 17, "Parulia"]
```

---

# 6. Select an Entire Object

### Request

```text
GET /?tarakQL=name
```

### Response

```json
[
   {
      "firstName": "Taraknath",
      "lastName": "Karan"
   }
]
```

---

# 7. Select an Entire Array

### Request

```text
GET /?tarakQL=website
```

### Response

```json
[["https://taraknath341.github.io", "https://tarakpro.netlify.app", "https://taraknotes.netlify.app"]]
```

---

# 8. Access Array Items

TarakQL can access array items using their index.

Array indexes start from `0`.

### Request

```text
GET /?tarakQL=website.0
```

### Response

```json
["https://taraknath341.github.io"]
```

Get the second website:

```text
GET /?tarakQL=website.1
```

### Response

```json
["https://tarakpro.netlify.app"]
```

---

# Query Syntax

| Query                         | Description                      |
| ----------------------------- | -------------------------------- |
| `?tarakQL=age`                | Select one field                 |
| `?tarakQL=name`               | Select an object                 |
| `?tarakQL=age,village`        | Select multiple fields           |
| `?tarakQL=name.firstName`     | Select nested data               |
| `?tarakQL=website.0`          | Select an array item             |
| `?tarakQL=name.firstName,age` | Combine nested and normal fields |

---

# Server-Side Usage

First, register the middleware:

```js
app.use(tarakParser);
```

Then use `res.tarakSend()` instead of `res.json()`:

```js
app.get("/user", (req, res) => {
   res.tarakSend({
      name: "Taraknath",
      age: 17,
   });
});
```

If the client does not send a `tarakQL` query:

```js
res.tarakSend(data);
```

works like:

```js
res.json(data);
```

If a `tarakQL` query exists, only the requested data is returned.

---

# Example API

```js
import express from "express";
import { tarakParser } from "tarakql";

const app = express();

app.use(tarakParser);

app.get("/user", (req, res) => {
   res.tarakSend({
      id: 1,
      name: {
         firstName: "Taraknath",
         lastName: "Karan",
      },
      age: 17,
      village: "Parulia",
      website: ["https://taraknotes.netlify.app", "https://taraknath341.github.io", "https://tarakpro.netlify.app"],
   });
});

app.listen(3000, () => {
   console.log("TarakQL API running on port 3000");
});
```

### Example Requests

```text
/user
/user?tarakQL=id
/user?tarakQL=name
/user?tarakQL=name.firstName
/user?tarakQL=id,age,village
/user?tarakQL=name.firstName,name.lastName
/user?tarakQL=website.0
```

---

# Why TarakQL?

TarakQL is designed for developers who already use REST APIs and want a simple way to request specific response data.

You keep your existing REST endpoints:

```text
GET /users
GET /products
GET /posts
```

Then TarakQL adds flexible data selection:

```text
GET /users?tarakQL=name,age
GET /products?tarakQL=name,price
GET /posts?tarakQL=title,author.name
```

No complex query syntax is required.

---

# TarakQL vs Traditional REST

## Traditional REST

```text
GET /user
```

Returns everything:

```json
{
   "id": 1,
   "name": "Tarak",
   "age": 17,
   "email": "example@email.com",
   "address": {},
   "settings": {},
   "website": []
}
```

## TarakQL

```text
GET /user?tarakQL=name,age
```

Returns only:

```json
["Tarak", 17]
```

---

# Important Note

TarakQL is currently a **lightweight response data selection layer for REST APIs**.

It does not aim to replace every feature of GraphQL. Its goal is to provide a simple and familiar way for REST API users to request specific data.

---

# License

```text
MIT License
```

---

## TarakQL

**Simple REST queries. Flexible responses.**

> **TarakQL — Query Your REST API, Simply.**
