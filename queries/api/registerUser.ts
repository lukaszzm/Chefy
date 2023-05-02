interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (credentials: RegisterCredentials) => {
  const response = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};
