# Jitsu Documentation Repository

This repository contains documentation published at https://jitsu.com/docs. Feel free to suggest edits. Links:

* Visit [jitsu.com](https://jitsu.com)
* Check out [EventNative](https://github.com/jitsucom/jitsu), Jitsu open-source core

## How to use

The files are formatted as [mdx](https://mdxjs.com/) with few custom components `<CodeInTabs />`, `<APIMethod />`, `<APIParam />`, `<LargeLink />` and `<Hint />`.

Few caveats:

 * You can't use markdown inside React components, stick to HTML
 * For code inside components use `<code inline={true}></code>` as equivalent of `\`code\`` in markdown
 * For JetBrains users: [MDX plugin](https://plugins.jetbrains.com/plugin/14944-mdx) is highly suggested. Make sure that you added .md extension to Preferences → Editor → File Types → MDX. Our .md files are actually mdx, you just need to tell that to IDE
    * **Note!** Beware of IDEA's auto-import feature, it kills H1 header sometimes

## Deploy

After any pushed update submit the following command in `https://github.com/jitsucom/jitsu` repository:

```bash
git submodule update --remote
```
