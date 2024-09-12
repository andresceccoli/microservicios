
# Servicio Event

## Modelo de datos

### Event
```json
{
	"id": string
	"name": string,
	"when": number (timestamp),
	"updated": number (timestamp),
	"created": number (timestamp),
	"canceled": number (timestamp),
	"ownerId": string (-> User)
}
```

## API

### Crear Evento

`POST /event`

Recibe `name` y `when`. Requiere auth.
Debe setear `ownerId` al usuario que invoca.
`when` no puede estar en el pasado.

#### Headers
|Cabecera|Contenido|
|---|---|
|`Authorization: Bearer xxx`|Token en formato JWT|

### Cancelar Evento

`DELETE /event/:id`

Requiere auth.
Setea el atributo `canceled`. No podrá aceptar inscripciones. Solo el owner puede cancelarlo.

#### Headers
|Cabecera|Contenido|
|---|---|
|`Authorization: Bearer xxx`|Token en formato JWT|

### Modificar Evento

`PUT /event/:id`

Requiere auth. Solo el owner puede modificar.
Se puede modificar `name` y `when`. 
`when` no puede estar en el pasado.

#### Body
```json
{
	"id": string,
	"name": string,
	"when": number (timestamp)
}
```

#### Headers
|Cabecera|Contenido|
|---|---|
|`Authorization: Bearer xxx`|Token en formato JWT|


### Consultar eventos abiertos

`GET /event`

Lista los eventos futuros (when) no cancelados.

Devuelve:

```json
[
	{
		"id": string,
		"name": string,
		"when": number (timestamp),
		"ownerId": string,
		"ownerName": string
	}
]
```

### Consultar evento

`GET /event/:id`

Devuelve un evento por id.

Devuelve:

```json
{
	"id": string
	"name": string,
	"when": number,
	"updated": number,
	"created": number,
	"canceled": number,
	"ownerId": string
}
```

Devuelve `404` en caso de que no exista el id.

