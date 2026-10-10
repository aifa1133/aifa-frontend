// Wrapper around fetch that auto-logs out on 401 (expired session)
function handleUnauthorized() {
  localStorage.removeItem("aifa_token");
  localStorage.removeItem("aifa_user");
  localStorage.removeItem("aifa_admin_token");
  localStorage.removeItem("aifa_admin_user");
  // Redirect to login — admin goes to /adminlogin, students to /
  const isAdmin = window.location.pathname.startsWith("/admin");
  window.location.href = isAdmin ? "/adminlogin" : "/";
}

export async function apiFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (res.status === 401) {
    handleUnauthorized();
    // Return a never-resolving promise so callers don't process the response
    return new Promise(() => {});
  }
  return res;
}
