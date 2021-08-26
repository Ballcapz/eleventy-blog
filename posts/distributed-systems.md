---
layout: post-layout.njk
title: Gray Failure - Notes
date: 2021-03-25
tags: ["post", "notes", "distributed", "dev", "code"]
---

# On Gray Failure

<!-- Excerpt Start -->

These are some of my notes that I've taken on gray failure in distributed systems. 
What it is, why it happens, and how to prevent it.
Notes on a paper written by `Azure` developers, and things they have learned.

<!-- Excerpt End -->


[Link to original paper](https://www.microsoft.com/en-us/research/wp-content/uploads/2017/06/paper-1.pdf)


## What is a gray failure?
- Subtle underlying faults in cloud/distributed environments that cause availability breakdowns and performance anomalies

- Not a full-stop failure

- KEY FEATURE: `Differential observability`

## Ways to deal with Gray Failure
- Health Monitor/Heart beat that matches the `client-service` relationship 1-1
	- This is one opportunity for less/none `differential observability`
	- Our observations of the system are the same as someone or something using it
	- EX:
		- A link with low bandwidth might look ok to a health check, but not have the ability to handle the real-world workload

- Not having Over-redundancy
	- If you have too much redundancy, you may not know something is wrong until the load on the system really gets too high, or a lot of time has passed.

- Lining up timestamps across regions. What order did things really happen in? 
	- Make sure timestamps include time zones, or use the same time zone for everything. There are many considerations to be made here on top of that too.

- More e2e observability
	- In general, we need to know information from the inside of systems as well as the outside, and we need to know that for every piece of the project.


