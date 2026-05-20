# Auth Endpoints

GraphQL endpoint:

```text
POST http://localhost:3000/api/graphql
```

Recommended headers:

```text
Content-Type: application/json
```

## Register

Raw JSON for Postman:

```json
{
  "query": "mutation Register($input: RegisterDto!) { register(input: $input) }",
  "variables": {
    "input": {
      "email": "test@mail.com",
      "password": "123456",
      "login": "test"
    }
  }
}
```

Expected response:

```json
{
  "data": {
    "register": "registered"
  }
}
```

## Login

Raw JSON for Postman:

```json
{
  "query": "mutation Login($input: LoginDto!) { login(input: $input) }",
  "variables": {
    "input": {
      "email": "test@mail.com",
      "password": "123456"
    }
  }
}
```

Expected response:

```json
{
  "data": {
    "login": "logged in"
  }
}
```

Notes:

- `login` writes JWT into `HttpOnly` cookie.
- In Postman, keep cookies enabled so the next request can reuse the auth cookie.

## Me

Protected query.

Raw JSON for Postman:

```json
{
  "query": "query Me { me { id login email } }",
  "variables": {}
}
```

Expected response shape:

```json
{
  "data": {
    "me": {
      "id": "user-id",
      "login": "test@mail.com",
      "email": "test@mail.com"
    }
  }
}
```

## Test Flow

1. Run `register`
2. Run `login`
3. Run `me`

If `me` returns `Unauthorized`, check:

- `login` was called successfully
- Postman stored the auth cookie
- the cookie is sent to `http://localhost:3000/api/graphql`
