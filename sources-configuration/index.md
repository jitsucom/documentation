import {APIParam, APIMethod} from "../../../components/documentationComponents";
import {Hint} from "../../../components/documentationComponents";

# Sources Configuration

### Sources

Sources are used to import data from platforms API (Google Analytics, Facebook, etc) or databases (redis, firebase, etc) into [destinations](/docs/destinations-configuration).
Specific data can be stored into your data warehouse for analytics or other needs.

### Collections

As the source may contain inhomogeneous data, it may be split into multiple `collections`. Each collection represents some subset of data that would be stored to the same structure within the destination (in the case of SQL database, this is a table).

Collections may be static or configurable. For instance, **Firebase** collections are static while **Google Analytics** report is parametrized (**Google Analytics** has `dimensions` and `metrics`).

Full description of the collection:

```yaml
collections:
  - name: "some_name"
    type: "collection_type_id"
    table_name: "table_name_for_data"
    start_date: "2020-06-01"
    parameters:
      field1: "value"
      field2: ["values"]
      field3: 
        some_object:
      ...
```

| Parameter | Description |
| :--- | :--- |
| `name` (required)  | is a unique identifier of collection within a list of collections |
| `type`  | determines which data subset must be synchronized. If type absents, type equals to `name` parameter |
| `table_name` | name of the table to keep synchronized data. If not set, equals to the name of collection |
| `start_date` | start date string of data to download in `YYYY-MM-DD` format. Default values is `365` days ago |
| `parameters` | if the collection is parametrized, parameter values are set here. A value may be of any type (`string`, `number`, `boolean`, `list`, `object`) |

If the collection has no parameters, it may be configured only by its name as a string argument. For example:

```yaml
collections: ["collection1_id", "collection2_id"]
```

### Configuration

<Hint>
    This feature requires:
    <li><code inline="true">meta.storage</code> <a href="/docs/configuration">configuration</a></li>
    <li><code inline="true">primary_key_fields</code> <a href="/docs/configuration/primary-keys-configuration">configuration</a> (in Postgres destination case)</li>
</Hint>

Example of source configuration:

```yaml
sources:
  firebase_example_id:
    type: firebase
    destinations:
      - "<DESTINATION_ID>"
    collections:
      - "<FIRESTORE_COLLECTION_ID>"
    config:
      project_id: "<FIREBASE_PROJECT_ID>"
      key: '<GOOGLE_SERVICE_ACCOUNT_KEY_JSON>'
  google_analytics_example_id:
    type: google_analytics
    destinations:
      - "<DESTINATION_ID>"
    collections:
      - name: "report_test"
        type: "report"
        parameters:
          dimensions:
            - "ga:country"
            - "ga:yearMonth"
          metrics:
            - "ga:sessions"
    config:
      view_id: "<VIEW_ID_VALUE>"
      auth:
        service_account_key: "<GOOGLE_SERVICE_ACCOUNT_KEY_JSON>"
  ...

```

Common parameters for all sources (**all parameters are required**):

| Parameter | Description |
| :--- | :--- |
| `type`  | determines the type of a data source from which data would be imported (like `google_analytics` or `firebase`) |
| `destinations`  | list of destination ids where result must be stored |
| `collections`  | list of collections to synchronize |
| `config` | custom parameters for each source type |

To see how to configure some type of source, please visit documentation pages for exact source types.

### Sync jobs

At present, you can run sync jobs manually by sending an HTTP POST request to EventNative with `source_id`.

Admin token configuration is **required**:

```yaml
server:
  admin_token: your_admin_token
  
sources:
  source_id:
    type: ...
    ...
```

<APIMethod method="POST" path="/api/v1/sources/:source_id/sync" title="Running sync job"/>

Authorization server secret token might be provided either as query parameter or HTTP header

<h4>Parameters</h4>

<APIParam name={"source_id"} dataType="string" required={true} type="pathParam" description="Source ID from 'sources' configuration section"/>
<APIParam name={"X-Auth-Token"} dataType="string" required={true} type="header" description="Server secret token"/>
<APIParam name={"token"} dataType="string" required={true} type="queryString" description="Server secret token"/>

<h4>Response</h4>

Task has been started:

```json
{"status": "ok"}
```

<h4>Error Response</h4>

Source wasn't found:

```json
{
    "message": "Sync failed",
    "error": "Source [jitsu_firebase] doesn't exist"
}
```

<h4>Authorization Error Response</h4>

```json
{
    "message": "Admin token does not match"
}
```

<h4> CURL example</h4>

```bash
curl -X POST 'https://<your_server>/api/v1/sources/<source_id>/sync?token=<admin_token>'
```

<APIMethod method="GET" path="/api/v1/sources/:source_id/status" title="Get sync job status"/>

Authorization server secret token might be provided either as query parameter or HTTP header

<h4>Parameters</h4>

<APIParam name={"source_id"} dataType="string" required={true} type="pathParam" description="Source ID from 'sources' configuration section"/>
<APIParam name={"X-Auth-Token"} dataType="string" required={true} type="header" description="Server secret token"/>
<APIParam name={"token"} dataType="string" required={true} type="queryString" description="Server secret token"/>

<h4>Response</h4>

Sync job status per collection. `logs` - string logs representation with `\n` delimiter:

```json
{
    "statuses": [
        {
            "collection": "auth_users",
            "status": "OK",
            "logs": "2021-02-15 12:45:01 [INFO]: [jitsu_firebase] Running sync task type: [firebase]\n2021-02-15 12:45:01 [INFO]: [jitsu_firebase] Total intervals: [1]\n"
        }
    ]
}
```

<h4>Error Response</h4>

Source wasn't found:

```json
{
    "message": "Getting statuses failed",
    "error": "Source [jitsu_firebase_auth_uses] doesn't exist"
}
```

<h4>Authorization Error Response</h4>

```json
{
    "message": "Admin token does not match"
}
```

<h4> CURL example</h4>

```bash
curl -X POST 'https://<your_server>/api/v1/sources/<source_id>/status?token=<admin_token>'
```


### How it works

Data may be synchronized by time chunks (if data source supports data loading by time intervals) or all data is loaded together. This depends on the type of data source and defined at driver implementation (an entity that loads data). EventNative stores information about synchronized chunks at `meta storage` (meta storage configuration is described at [General Configuration](/docs/configuration)). Time chunk is synchronized if

* it is not synchronized yet
* time chunk covers the current moment
* time chunk covers the previous period to the current one (in case some data is loaded after the period ends)

The result of synchronization is a replica of data from the data source with some enriched fields. 

* `eventn_ctx_collection_id` contains the type of collection (see documentation on collections [below](/docs/sources-configuration#collections))
* `eventn_ctx_event_id` a hash of the synchronized object
* `eventn_ctx_time_interval` field stores information about what synchronization interval
* `eventn_ctx_interval_start` field stores information about start of synchronization interval
* `eventn_ctx_interval_end` field stores information about the end of synchronization interval