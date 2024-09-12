
# Servicio Inscripciones (EventSignup)

## Modelo de datos

### EventSignup
```json
{
	"id": string
	"userId": string (-> User),
	"eventId": string (-> Event),
	"created": number (timestamp),
	"canceled": number (timestamp),
}
```

## API

### Inscripción

`POST /signup`

Recibe `eventId` . Requiere auth.
Inscribe al usuario indicado por el auth. No puede ya haber otra inscripción vigente para el mismo evento y usuario. El evento no debe estar cancelado.

#### Headers
|Cabecera|Contenido|
|---|---|
|`Authorization: Bearer xxx`|Token en formato JWT|

### Cancelar Inscripción

`DELETE /signup/:id`

Requiere auth. Solo el usuario de la inscripción es el que puede cancelarla.
Setea el atributo `canceled`. 

#### Headers
|Cabecera|Contenido|
|---|---|
|`Authorization: Bearer xxx`|Token en formato JWT|

### Listar inscriptos

`GET /signup?eventId={eventId}`

Devuelve:
```json
[
	{
		"userName": string,
		"userId": string,
		"id": string,
		"signupDate": number (timestamp)
	}
]
```
