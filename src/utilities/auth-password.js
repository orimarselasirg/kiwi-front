
export const validPassword = (password) => {
  const validPassword = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ](?=.*[.,*!?¿¡/#$%&])\S{8,16}$/
  if (!validPassword.test(password)) {
    return false
  }
  return true
}
