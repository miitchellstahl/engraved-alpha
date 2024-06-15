const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getMyDeceasedUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/deceasedUser`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get deceased users");
  }

  return response.json();
};

export const getMyDeceasedUser = async (deceasedUserId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/deceasedUser/${deceasedUserId}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get deceased user");
  }

  return response.json();
};

export const updateMyDeceasedUser = async (
  deceasedUserId: string,
  updateDeceasedUserFormData: FormData
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/deceasedUser/${deceasedUserId}`,
    {
      method: "PATCH",
      credentials: "include",
      body: updateDeceasedUserFormData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update deceased user");
  }

  return response.json();
};

export const createMyDeceasedUser = async (
  createDeceasedUserFormData: FormData
) => {
  const response = await fetch(`${API_BASE_URL}/api/deceasedUser`, {
    method: "POST",
    credentials: "include",
    body: createDeceasedUserFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};
