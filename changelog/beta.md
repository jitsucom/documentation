---
sort: 1
---

# Beta

This page describes features that are in the EventNative beta. You can use them in `ksense/eventnative:beta` docker image or from git sources - `beta` branch.

### Retrospective users recognition with Redshift
EventNative can change the past starting now with Redshift as well! Once user's identity is known (as a result of registration or any other type of conversion), the special piece of code amends all previous events made by this user and assigns a user id to all of them. Thus, an exact path to conversion of the user is known!

[**Read more about Retrospective User Recognition configuration** ](/docs/other-features/retrospective-user-recognition) »

### Automatic sources synchronization
EventNative supports cron style schedule configuration for automatic sources synchronization! You still can initiate source synchronization manually (by sending HTTP request).

[**Read more about sources synchronization** ](/docs/sources-configuration) »