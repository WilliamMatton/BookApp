# BookApp

BookApp is a full-stack application for keeping a personal book library and collecting quotes. The Angular client communicates with an ASP.NET Core Web API backed by PostgreSQL. Users can register and sign in; authenticated requests can create, update, and delete books and quotes.

## Technology

- **Client:** Angular 20, TypeScript, Bootstrap
- **API:** ASP.NET Core 9, Entity Framework Core 9
- **Database:** PostgreSQL
- **Authentication:** JWT access tokens and refresh tokens

## API overview

All routes are under `/api`.

| Area | Routes | Access |
| --- | --- | --- |
| Authentication | `POST /Auth/register`, `/Auth/login`, `/Auth/refresh-token`, `/Auth/logout` | Register, login, and refresh are public; logout requires a bearer token |
| Books | `GET /Books`, `GET /Books/{id}`, `POST /Books`, `PUT /Books/{id}`, `DELETE /Books/{id}` | Reads are public; writes require a bearer token |
| Quotes | `GET /Quotes`, `GET /Quotes/{id}`, `POST /Quotes`, `PUT /Quotes/{id}`, `DELETE /Quotes/{id}` | Reads are public; writes require a bearer token |
