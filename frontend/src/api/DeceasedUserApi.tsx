const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createPhotoPost = async (
  deceasedUserId: string,
  photoFormData: FormData
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/deceasedUser/photo/${deceasedUserId}`,
    {
      method: "POST",
      credentials: "include",
      body: photoFormData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create photo post");
  }

  return response.json();
};

export const createPlacePost = async (
  deceasedUserId: string,
  placeFormData: FormData
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/deceasedUser/place/${deceasedUserId}`,
    {
      method: "POST",
      credentials: "include",
      body: placeFormData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create place post");
  }

  return response.json();
};

export const createMementoPost = async (
  deceasedUserId: string,
  mementoFormData: FormData
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/deceasedUser/memento/${deceasedUserId}`,
    {
      method: "POST",
      credentials: "include",
      body: mementoFormData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create memento post");
  }

  return response.json();
};

export const getAllDeceasedUsers = async () => {
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

export const getDeceasedUserElementCounts = async (deceasedUserId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/deceasedUser/${deceasedUserId}/counts`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get deceased user counts");
  }

  return response.json();
};

export const getAlbum = async (
  albumId: string,
  page: number,
  limit: number
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/deceasedUser/album/${albumId}?page=${page}&limit=${limit}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get album");
  }

  return response.json();
};

export const getDeceasedUserAlbums = async (deceasedUserId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/deceasedUser/albums/${deceasedUserId}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get albums");
  }

  return response.json();
};

export const getAllDeceasedUserPets = async (
  deceasedUserId: string,
  page: number,
  limit: number
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/deceasedUser/pets/${deceasedUserId}?page=${page}&limit=${limit}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get pets");
  }

  return response.json();
};

export const getAllDeceasedUserPlaces = async (
  deceasedUserId: string,
  page: number,
  limit: number
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/deceasedUser/places/${deceasedUserId}?page=${page}&limit=${limit}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get places");
  }

  return response.json();
};

export const getAllDeceasedUserMementos = async (
  deceasedUserId: string,
  page: number,
  limit: number
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/deceasedUser/mementos/${deceasedUserId}?page=${page}&limit=${limit}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get mementos");
  }

  return response.json();
};

export const getAllDeceasedUserPhotos = async (
  deceasedUserId: string,
  page: number,
  limit: number
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/deceasedUser/photos/${deceasedUserId}?page=${page}&limit=${limit}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get photos");
  }

  return response.json();
};

export const getOneDeceasedUser = async (deceasedUserId: string) => {
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

export const getDeceasedUserWall = async (deceasedUserId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/deceasedUser/${deceasedUserId}/wall`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get deceased user wall");
  }

  return response.json();
};
