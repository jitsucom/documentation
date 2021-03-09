export type Page = {
    path: string
    children: Page[]
}


export type Section = {
    name: string
    pages: string[]
}

export const tableOfContents: Section[] = [
    {
        name: "🚀 Quick Start", pages: [
            "deployment",
            "changelog"
        ]
    },
    {
        name: "How it works", pages: [
            "how-it-works/architecture",
            "how-it-works/directories-structure",
            "how-it-works/pipelines"
        ]
    },
    {
        name: "Sending data", pages: [
            "sending-data/javascript-reference",
            "sending-data/api"
        ]
    },
    {
        name: "Configuration", pages: [
            "configuration",
            "destinations-configuration",
            "sources-configuration"
        ]
    },
    {
        name: "Features", pages: [
            "other-features/scaling-eventnative",
            "other-features/segment-compatibility",
            "other-features/dry-run-events",
            "other-features/retrospective-user-recognition",
            "other-features/events-cache",
            "other-features/geo-data-resolution",
            "other-features/typecast",
            "other-features/admin-endpoints",
            "other-features/application-metrics",
        ]
    }

]
