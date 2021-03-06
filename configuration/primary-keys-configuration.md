import {Hint} from "../../../components/documentationComponents";


# Primary Keys Configuration

Primary keys configuration is available only for [PostgreSQL](/docs/destinations-configuration/postgres)
and [Redshift](/docs/destinations-configuration/redshift), but this feature may be implemented for other destinations in the future.

To configure the primary key for the table, you should specify fields that will be used as a key part. For example:

```yaml
destinations:
  postgres_destination:
      type: postgres
      mode: stream
      datasource:
        schema: <SCHEMA>
        host: <HOST>
        port: <PORT>
        db: <DATABASE>
        username: <USERNAME>
        password: <YOUR_PASSOWORD>
      data_layout:
        primary_key_fields: 
          - email
```

According to this config, the primary key will be created based on `email` field. All events with the same
key will be merged, new data will replace fields of older events.

It's also possible to create primary keys with multiple fields (as you can see from the config, `primary_key_fields` is an array). The
following `data_layout` config creates the primary key based on `email` and `name` fields.

```yaml
data_layout:
  primary_key_fields: 
    - email 
    - name
```

<Hint>
    Primary keys constraint is created with <code inline="true">$DB_SCHEMA.$DB_TABLE_pk</code> name, where <code inline="true">$DB_SCHEMA</code> - your database schema name and <code inline="true">$DB_TABLE</code> - your table name
</Hint>



