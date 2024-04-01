export function getAuthUser() {
  const userId = JSON.parse(localStorage.getItem("user"));
  return userId;
}
