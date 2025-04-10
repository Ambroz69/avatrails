import jwt from 'jsonwebtoken';

const auth = async (request, response, next) => {
  try {
    //   get the token from the authorization header
    const token = await request.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = jwt.verify(token, process.env.LOGIN_SECRET);

    // retrieve the user details of the logged in user
    const user = decodedToken;

    // pass the user down to the endpoints here
    request.user = user;

    // pass down functionality to the endpoint
    next();

  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

export default auth;

export const getUserRoleFromToken = (token) => {
  try {
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return payload?.userRole || "user"; // Default role: 'user'
  } catch (error) {
      console.error("Error decoding token:", error);
      return "user"; // Default role
  }
};