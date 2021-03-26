---
layout: post-layout.njk
title: NDC Minnesota 2020
date: 2020-09-15
tags: ["post"]
---

# Tuesday - Test Driven Development in Modern JavaScript

**With Roy Osherove**

<!-- Excerpt Start -->

This year NDC Minnesota was online, and it was a week full of excellent workshops. It kicked off on Tuesday September 8th with a day long workshop on TDD in modern JavaScript with _Art of Unit Testing_ author Roy Osherove.

<!-- Excerpt End -->

## An overview of the day

1. Control of dependencies
2. What tests give us the most confidence in our code?

   - End-to-End tests give us the highest confidence, while unit tests give us the lowest confidence
   - This means we want to have an _Intentional_ test strategy in place

   For Example: In a specific scenario, decide what level you need tests at, with a goal ratio (most of the time) of 1 E2E test per 5-10 integration tests; and 1 integration test per 5-10 unit tests

3. When we write a unit test, we write it to prove that the functionality that we want **DOES NOT EXIST**.
4. Writing a unit test is how we design what we want the public api to look like when we are actually using it in our code
5. Solve the problems incrementally
   - This helps us think of more test cases and use cases for our api

## Things to remember

- Without design skill, TDD **WILL NOT** help you have a good design.
- Just because a design is testable does not mean it is a good design.
- TDD does give hints at what might be a good design, but it is not an end-all be-all.

## What is a unit of work?

A unit of work has one logical path

- A start point and an exit point
- Exit points ARE the requirements of a unit

There are 3 types of exit points:

- A return or an exception (value-based testing): This is the easiest to test and the preferred way to test
- State Mutation: Any noticeable mutation of the state (NOT 3RD PARTY)
- Calling of a 3rd party dependency: Something that we fire and forget

## Asserting

Assertions happen on the exit point of a unit of work, and there is one assert per test.

Fake dependencies (fake):

- If we are asserting against a fake, it is a MOCK.
- If we are not asserting against a fake, it is a STUB.

Functions that have 3 exit points should have three separate tests.

There should only be a single mock per test since we only want to assert once, and asserting on Stubs is an anti-pattern.

## Tests should only touch the Public API

Anything that is a Public function, which in JavaScript includes callbacks. Therefore, you should make callbacks public functions.

## How to practice Unit Testing

Step one here is to do it a lot. Daily practice is recommended to improve your unit testing skills until it just becomes the way that you write code.

One of the best tools for this is unit testing Katas. Exercises to practice over and over, from scratch.

Here are some good examples of Katas that I now try to keep up practicing:

[TDD Katas Github](https://github.com/wix/tdd-katas) The one that I mainly practice is the String Calculator

There are also numerous other resources online to discover different TDD Katas you can do daily to improve your unit testing and TDD skills.

## Book Recommendations

- Test Driven Development: By Example - _Kent Beck_
- Extreme Programming Explained - _Kent Beck_
- The Art Of Unit Testing - _Roy Osherove_
