import { API_ENDPOINTS } from "../constants/apiConfig";
import { apiClient } from "./apiClient";
import { clearAuthTokens, saveAuthSession, saveAuthTokens } from "./authToken";

function parseAuthResponse(data) {
  // Expected response: { "token": "..." }
  const token = data?.token;
  return { access: token };
}

function extractStudentId(data, username, role) {
  const fromResponse =
    data?.student_id ??
    data?.studentId ??
    data?.child_id ??
    data?.childId ??
    data?.student?.id ??
    null;

  if (fromResponse !== null && fromResponse !== undefined && `${fromResponse}` !== "") {
    return fromResponse;
  }

  // Parent login uses student's credentials; keep username as fallback student identifier.
  if (role === "parent") {
    return username;
  }

  return null;
}

export async function signIn(username, password, role = "parent") {
  let endpoint;
  if (role === "admin") {
    endpoint = API_ENDPOINTS.adminLogin;
  } else if (role === "parent") {
    endpoint = API_ENDPOINTS.parentLogin;
  } else {
    endpoint = API_ENDPOINTS.teacherLogin;
  }

  const response = await apiClient.post(endpoint, { username, password });
  const tokens = parseAuthResponse(response.data);
  const studentId = extractStudentId(response.data, username, role);

  if (!tokens.access) {
    throw new Error("Login succeeded but no token was returned.");
  }

  await saveAuthTokens(tokens);
  await saveAuthSession({ role, username, studentId });
  return response.data;
}

export async function signOut() {
  await clearAuthTokens();
}

export async function getLoggedParentStudentInfo() {
  const response = await apiClient.get(API_ENDPOINTS.parentStudentInfo);
  return response.data;
}
