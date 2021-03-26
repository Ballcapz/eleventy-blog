---
layout: post-layout.njk
title: Adding darkmode to a website
date: 2021-03-25
tags: ["post", "css", "code", "dev"]
---

# Using Detect Dark mode

<!-- Excerpt Start -->

Changing the colorscheme of a website is basically a requirement these days, and I decided to add a nice and simple version for my new, lightweight blog.
A few weeks ago, I discovered a new media query while browsing the web, and I knew I had to try it out!

<!-- Excerpt End -->

I ended up using the media query of `prefers-color-scheme` to get the user's prefered colorscheme, instead of using a toggle switch for now.

I will eventually end up with a nice toggle or switch somewhere, but I really wanted to just play around with this media query I found out about!

It ended up being far simpler, and acts almost as a "native" application for the user, being that it ties into the browser's preferred colorscheme.

The media query is relatively straight forward, and I implemented it like this.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --black: #ffffff;
    --white: #232c33;
    --off-white: #111111;
    --blue-hl: var(--pewter);
    --blue: #3a6a92;
  }
}
```

And in my case, right before this media query I am using the following to set my normal colors for my site:

```css
:root {
  --blue: #172a3a;
  --blue-hl: #3a6a92;
  --black: #232c33;
  --pewter: #76949f;
  --white: #ffffff;
  --off-white: #fdfdfd;
}
```

All in all, it took me about 15 minutes to setup, just tweaking the colors of the darkmode, and I had my darkmode website ready to go!
