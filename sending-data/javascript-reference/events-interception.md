---
sort: 2
---

import {CodeInTabs, CodeTab} from "../../../../components/Code";
import {Hint} from "../../../../components/documentationComponents";


# Events Interception

EventNative javascript tracker could be configured to intercept events from third-party tracking systems. Currently, we support [Google Analytics](https://developers.google.com/analytics/devguides/collection/analyticsjs) and Segment's [Analytics.js](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/). 

EventNative will intercept all events, transform them to an internal structure and pass further to the original destination. EventNative initialization code **must be** executed (added into `<head>` section if tracking code is [added directly](/docs/sending-data/javascript-reference/#quickstart)) before intercepted tracking code (GA or Segment)


<Hint>
    Only current version of <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs">GA Javascript API</a> is supported.
    We do not support <a href="https://developers.google.com/analytics/devguides/collection/gajs">Legacy API (aka ga.js)</a>
</Hint>

Event interceptors should be explicitly enabled with `segment_hook` or `ga_hook` parameter (please see [Configuration Reference](/docs/sending-data/javascript-reference/initialization-parameters)).

<CodeInTabs>
    <CodeTab title="Intercept Google Analytics Events" lang="javascript">
        {`
        eventN.init({
            key: "...",
            tracking_host: "....",
            ga_hook: true
        });`}
    </CodeTab>
    <CodeTab title="Intercept Segment Event" lang="javascript">
        {`
        const { eventN } = require('@jitsu/eventnative');
        eventN.init({
            key: "...",
            tracking_host: "....",
            segment_hook: true
        });`}
    </CodeTab>
</CodeInTabs>