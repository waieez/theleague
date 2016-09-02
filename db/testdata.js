var users = [
  {
    username: "test_user",
    password: "test_pass",
    profile: {
      name: "test_user",
      gender: "M",
      age: 30,
      height: 5.5,
      religion: "whatever",
      location: "San Francisco"
    },
    preference: {
      gender: "F",
      minAge: 20,
      maxAge: 30,
      minHeight: 5,
      maxHeight: 6,
      location: "San Francisco"
    }
  },
  {
    username: "test_user1",
    password: "test_pass",
    profile: {
      name: "test_user1",
      gender: "M",
      age: 25,
      height: 6.0,
      religion: "whatever",
      location: "San Francisco"
    }
  },
  {
    username: "test_user2",
    password: "test_pass",
    profile: {
      name: "test_user2",
      gender: "F",
      age: 25,
      height: 5.5,
      religion: "whatever",
      location: "Los Angeles"
    }
  },
  {
    username: "test_user3",
    password: "test_pass",
    profile: {
      name: "test_user3",
      gender: "F",
      age: 30,
      height: 6.0,
      religion: "whatever",
      location: "San Francisco"
    }
  }
]

module.exports = {
  users: users,
}