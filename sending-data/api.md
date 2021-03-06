import {Hint, APIParam, APIMethod, LargeLink} from "../../../components/documentationComponents";

# Event API

EventNative has API for direct event collection. You can use it for sending events directly from apps or backends.

<APIMethod method="POST" path="/api/v1/s2s/event?token=$api_key" title="S2S event"/>

Authorization server secret token might be provided either as query parameter or HTTP header

<h4>Parameters</h4>

<APIParam name={"X-Auth-Token"} dataType="string" required={true} type="header" description="Server secret token"/>
<APIParam name={"token"} dataType="string" required={true} type="queryString" description="Server secret token"/>

<h4>Request Payload</h4>

The body is any JSON object:

```json
{
  "event_id": "x96f60pzk1",
  "event_data": {
    ...
  },
  "page_ctx": {
    "page_title": "EventNative Demo",
    "referer": "",
    "url": "http://track-demo.ksense"
  },
  "device_ctx": {
    "ip": "10.10.10.10",
    "user_agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
  },
  "user": {
    ...
  }
}
```

<h4>Response</h4>

```json
{"status": "ok"}
```

<Hint>
    For Geo or User-Agent resolving you should configure an enrichment rule. Read more about <a href="/docs/configuration/enrichment-rules">enrichment rules</a>.
</Hint>

<LargeLink title="Configuration of Authorization" href="/docs/configuration/authorization" />