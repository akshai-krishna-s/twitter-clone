// userTransformer takes in a user object and returns an object containing only the id, username, email, name and profileImage properties of the user object.
/**
 * This function transforms the user object to return only the required
 * properties to the client.
 *
 * @param {Object} user - The user object.
 * @returns {Object} - The transformed user object.
 */
export const userTransformer = (user) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    profileImage: user.profileImage,
  }
}
