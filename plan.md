Ideas:

API

POST /login
- Registered/Authenticated users should recieve a session token

POST /signup
- User should send a payload with the user's desired username/password as well as personal information
  - Name,
  - Gender,
  - Age,
  - Height,
  - Religion,
  - Location

  - perhaps create null/default preferences initially

PUT /profile/:id
  - Auth users should be able to edit their profile details

PUT /preferences/:id
  - Auth users should be able to edit their preferences
  - Gender,
  - Age range,
  - Height range,
  - Religions?
  - Distance

GET /matches/[:id???]
  - looks up a user's preferences (optionally send preference) and returns 0~5 people that match a user's preferences

Stretch

POST /like/:id

POST /pass/:id

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



Requirements:

The server should have 3 routes:

1. Signup ­ Create a new user with user preferences, username & password.

2. Login ­ Create a user session.

3. Get a batch of 5 potential people for the user to review that s/he may reject or heart/like

(make sure you take into account the current user and the potential people preferences)

­ array of 5 people with their basic info.

Bonus:

1. Like a person

2. Reject a person
