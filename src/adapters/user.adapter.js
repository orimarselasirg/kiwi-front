export const createUserAdapter = (user) => ({
  name: user.username,
  email: user.email,
  password: user.password
})
