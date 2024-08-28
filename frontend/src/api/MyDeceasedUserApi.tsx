const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface OnboardingData {
  onboardingId: string;
  formData: Record<string, any>;
  currentStep: number;
}

export const getMyDeceasedUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/my/deceasedUser`, {
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

export const updateMyDeceasedUser = async (
  deceasedUserId: string,
  updateDeceasedUserFormData: FormData
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my/deceasedUser/${deceasedUserId}`,
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
  const response = await fetch(`${API_BASE_URL}/api/my/deceasedUser`, {
    method: "POST",
    credentials: "include",
    body: createDeceasedUserFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

export const startOnboarding = async (): Promise<{ onboardingId: string }> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my/deceasedUser/onboarding/start`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to start onboarding");
  }

  return response.json();
};

export const saveOnboardingProgress = async (
  data: FormData
): Promise<{ onboarding: OnboardingData }> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my/deceasedUser/onboarding/save`,
    {
      method: "POST",
      credentials: "include",
      body: data,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to save onboarding progress");
  }

  return response.json();
};

export const getOnboardingProgress = async (
  onboardingId: string
): Promise<OnboardingData> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my/deceasedUser/onboarding/${onboardingId}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get onboarding progress");
  }

  return response.json();
};

export const completeOnboarding = async (
  data: FormData
): Promise<{ deceasedUserId: string }> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my/deceasedUser/onboarding/complete`,
    {
      method: "POST",
      credentials: "include",
      body: data,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to complete onboarding");
  }

  return response.json();
};
