Ideas:

Initial thoughts:

Each user has a pointer to the last id they've seen (voted on)
Even if past matches have changed their profile and now match the user's preferences, the restriction that votes cannot be changed allows us to simply increment this pointer.
This also neatly handles the issue where a user's preferences might change.
Depending on how this approach is executed, it may be relatively performant.

Realized I made an assumption about users so I'll assert that here.
Users are never deleted. we can perhaps disable them via some disabled flag this is a difficult question but worth discussing

Challenges:

  Religion and location will be harder to handle efficiently. Shall tackle those last.
  Auth is hard to get right. Start with basicauth. dive deeper if time permits
  Can't do auth securely without SSL/certs. Another thing I may have to punt on.
  Depending on the choices made, deploying the service may not be as straightforward and might become a timesuck.

Some questions to think about:
  Expected load? DAU? RPS? Strong or Eventual Consistency ok?