import {APIMethod, APIParam} from "../../../components/documentationComponents"; import {CodeInTabs, CodeTab} from "../../../components/Code";

# Test mapping with Dry-Run



To figure out what structure will be used to store your event without saving it to the destination, you may use a dry run endpoint and get the structure of the processed event. 

If you want to configure the destination so that it could not be used in production, i.e. no data is stored there,
you may use `staged` parameter set to true \(see more information at
[destination configuration section](/docs/destinations-configuration/)\). Such destinations support only
dry run operation until you switch them from the staged mode.

<APIMethod method="post" path="/api/v1/events/dry-run?destination_id=[id]" />


The event will be processed by Eventnative - all the enrichment and type resolution steps will be applied. The response will have information field names, values, and data types of the event.

<APIParam dataType="string" required={true} type="header" name="X-Auth-Token">
    Token authorization. Read more at <a href="/docs/other-features/admin-endpoints">Admin endpoints</a>
</APIParam>

<APIParam dataType="string" required={true} type="queryString" name="destination_id">
    Destination id
</APIParam>

Request body is JSON of event you want to test using the dry run. Response will contain fields with mapped (or inferred) types
(read more about [mapping](/docs/configuration/schema-and-mappings))

Examples:
<CodeInTabs>
    <CodeTab lang="json" title="Request example">
{`
[
  {
    "field": "type",
    "type": "text",
    "value": "test"
  },
  {
    "field": "value",
    "type": "bigint",
    "value": 1
  },
  {
    "field": "new_field",
    "type": "text",
    "value": "value"
  },
  {
    "field": "one_more",
    "type": "bigint",
    "value": 31
  },
  {
    "field": "eventn_ctx_event_id",
    "type": "text",
    "value": "5b8ef217-7d80-47a1-9787-9ca98180d695"
  },
  {
    "field": "_timestamp",
    "type": "timestamp",
    "value": "2021-01-25T16:24:28.987259Z"
  },
  {
    "field": "source_ip",
    "type": "text",
    "value": "86.62.100.116"
  }
]
`}
    </CodeTab>
    <CodeTab lang="json" title="Request example">
{`
{
    "type": "test",
    "value": 1,
    "new_field": "value",
    "one_more": 31
}
`}
    </CodeTab>

</CodeInTabs>

