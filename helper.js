// Helper function to check token expiration

export default  function isTokenExpired(token) {
  if (!token) {
    // Token is missing
    return true;
  }

  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.exp) {
    // Invalid token format or missing expiration claim
    return true;
  }

  // Get the expiration timestamp from the token
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

  // Compare the expiration time with the current time
  const currentTime = Date.now();
  if (currentTime >= expirationTime) {
    // Token has expired
    return true;
  }

  // Token is not expired
  return false;
}

// Helper function to decode a JWT
function decodeToken(token) {
  try {
    // Split the token into header, payload, and signature parts
    const [header, payload, signature] = token.split(".");

    // Decode the payload (base64url encoding)
    const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));

    // Parse the JSON payload and return the decoded token
    return JSON.parse(decodedPayload);
  } catch (error) {
    // Invalid token format
    return null;
  }
}
