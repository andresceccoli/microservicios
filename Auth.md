
# Servicio Auth

## Modelo de datos

### User
```json
{
	"id": string
	"name": string,
	"username": string,
	"password": string (encrypted),
	"created": number (timestamp)
}
```

### Session
```json
{
	"id": string,
	"userId": string,
	"expires": number (timestamp)
}
```

## API


### Crear Usuario

`POST /user`

Recibe name, username y password como mínimo y crea el usuario.

#### Respuesta

```json
{
	"name": "string",
	"username": "string",
	"id": "string",
	"created": 23472384893
}
```

### Obtener Usuario actual

`GET /user/current`

Obtiene el usuario actual desde el almacén de datos a partir del token autenticado.

#### Headers
|Cabecera|Contenido|
|---|---|
|`Authorization: Bearer xxx`|Token en formato JWT|


#### Respuesta

```json
{
	"name": "string",
	"username": "string",
	"id": "string",
	"created": 23472384893
}
```

### Login

`POST /user/login`

Crea un token (`Session`) nuevo y lo devuelve.

#### Headers
|Cabecera|Contenido|
|---|---|
|`Authorization: Basic xxx`|Credenciales en formato basic (`"user:password"` en base64).|

#### Respuesta

```json
{
	"token": "JWT string",
}
```

### Logout

`POST /user/logout`

Elimina el token indicado en la autenticación del almacén de datos.

#### Headers
|Cabecera|Contenido|
|---|---|
|`Authorization: Bearer xxx`|Token en formato JWT|
