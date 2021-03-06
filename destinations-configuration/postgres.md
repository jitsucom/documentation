# Postgres

**EventNative** supports [Postgres](https://www.postgresql.org/) as a destination.
For more information about Postgres [see docs](https://www.postgresql.org/docs).

### Configuration

Postgres destination config consists of the following schema:

```yaml
destinations:
  my_postgres:
    type: postgres
    datasource:
      host: my_postgres_host
      db: my-db
      schema: myschema
      port: 5432
      username: user
      password: pass
      parameters:
        sslmode: disable
        connect_timeout: 300
```

### datasource

| Field \(\*required\) | Type | Description | Default value |
| :--- | :--- | :--- | :--- |
| **host\*** | string | Host of destination. | - |
| **port** | int | Port of destination. | `5432` |
| **db\*** | string | Database of destination. | - |
| **schema** | string | Schema of destination. | `public` |
| **username\*** | string | Username for authorization in a destination. | - |
| **password** | string | Password for authorization in a destination. | - |
| **parameters** | object | Connection parameters. see [Postgres documents](https://www.postgresql.org/docs/9.1/libpq-connect.html) page | `connect_timeout=600` |

