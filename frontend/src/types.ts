export type User = {
  _id: string;
  email: string;
  name: string;
  imageUrl: string;
};

export type DeceasedUser = {
  _id: string;
  user: string;
  firstName: string;
  lastName: string;
  profilePhotoUrl: string;
  birthDate: string;
  deathDate: string;
  cityBorn: string;
  cityDied: string;
  obituary: string;
  eulogy: string;
};
