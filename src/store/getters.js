const getters = {
  token: state => state.user.token,
  lang: state => state.user.lang,
  currentUser: state => state.user.currentUser,
  email: state => state.user.email
}
export default getters
