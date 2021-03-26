---
layout: post-layout.njk
title: Playwright Running In Github Actions
date: 2021-03-04
tags: ["post"]
---

# How I got Playwright Working in a Github Action

<!-- Excerpt Start -->

A few weeks ago we started using [Playwright](https://playwright.dev) to test some of our core user flows of our application, in an end-to-end fashion. We take a lot of our testing strategy from [Kent C. Dodds](https://kentcdodds.com/), as well as test plan strategy from [Roy Osherove](https://osherove.com/).

<!-- Excerpt End -->

Since a fair few cases we have are covered by our integration testing, we are only hitting main flows a user will take while using our application. You can read more about some of this type of test planning over in my [NDC Minnesota](/posts/ndc-minnesota-2020) post, or on [Roy Osherove's](https://osherove.com/) website.

To deploy our application, we use a Github action that checks-out, builds, tests, and deploys our code. Here are the sticking points we ran into when getting the [Playwright](https://playwright.dev) tests to work.

### 1. The Chrome sandbox not allowing tests to run - The fix:

```js
browser = await chromium.launch({
  headless: IS_HEADLESS,
  chromiumSandbox: false,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
```

So, this is kind of breaking some security practices, but since we are running the tests in an isolated, secure sandbox, this was a tradeoff we were willing to make. We also aren't exposing any sensitive data or anything, so thats another reason why we found no problem running the chromium instance without sandboxing.

### 2. Not being able to upload a file - The fix:

```js
page.on("filechooser", async (fileChooser) => {
  await fileChooser.setFiles("./__fixtures__/example.txt");
});
```

The file path is a relative path of where your node `cwd()` is, for example my `__fixtures__` folder is in the directory in this structure:

`tests` <br>
|------- `__tests__/`<br>
|------- `package.json`<br>
|------- `__fixtures__/`<br>

### 3. Waiting for selectors to be hidden - The fix:

```js
await page.waitForSelector('div:text-matches("example.txt")', {
  state: "hidden",
});
```

Which waits for the div with text content of `example.txt` to be hidden from the page.

<br />

These were the main sticking points I had getting [Playwright](https://playwright.dev) to work in production.
