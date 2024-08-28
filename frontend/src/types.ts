// User.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  createdAt: Date;
  onboardingUsers: any;
}

// export type eulogy = {
//   _id: string;
//   eulogySpeech: string;
//   eulogyAuthor: string;
//   eulogyProfilePhotoUrl: string;
// };

// DeceasedUser.ts
export interface EulogyItem {
  _id: string;
  eulogySpeech: string;
  eulogyAuthor: string;
  eulogyAuthorPhotoUrl: string;
}

export interface DeceasedUser {
  _id: string;
  user: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  deathDate: Date;
  cityBorn: string;
  stateBorn: string;
  cityDied: string;
  cityDiedLongitude: number;
  cityDiedLatitude: number;
  cityBornLongitude: number;
  cityBornLatitude: number;
  stateDied: string;
  obituary: string;
  eulogies: EulogyItem[];
  profilePhotoUrl: string;
  createdAt: Date;
  currentStep?: number;
}

// Memento.ts
export interface Memento {
  _id: string;
  deceasedUser: string;
  location: string;
  content: string;
  author: string;
  type: string;
  createdAt: Date;
}

// Pet.ts
export interface Pet {
  _id: string;
  photoUrl: string;
  deceasedUser: string;
  petName: string;
  petType: string;
  type: string;
  createdAt: Date;
}

// Photo.ts
export interface Photo {
  _id: string;
  photoUrl: string;
  deceasedUser: string;
  albumId: string;
  place: string;
  location: string;
  content: string;
  date: Date;
  author: string;
  albumTitle: string;
  type: string;
  createdAt: Date;
}

// export type PhotoPost = {
//   _id: string;
//   photoUrl: string;
//   content: string;
//   date: Date;
//   type: string;
//   author: string;
//   albumId: string;
//   albumTitle: string;
//   location: string;
//   place: string;
// };
// export type MementoPost = {
//   _id: string;
//   location: string;
//   createdAt: Date;
//   content: string;
//   author: string;
//   type: string;
// };

// export type Album = {
//   _id: string;
//   title: string;
//   albumDate: string;
//   deceasedUser: string;
//   photos: PhotoPost[];
// };

export interface Place {
  _id: string;
  placeLongitude: number;
  placeLatitude: number;
  deceasedUser: string;
  content: string;
  author: string;
  placeName: string;
  type: string;
  createdAt: Date;
  photos: Photo[];
}

// Album.ts
export interface Album {
  _id: string;
  title: string;
  albumDate: Date;
  deceasedUser: string;
  photos: Photo[];
  createdAt: Date;
}

export interface OnboardingData {
  onboardingId: string;
  formData: Record<string, any>;
  currentStep: number;
}
