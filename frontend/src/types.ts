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

// Define common properties for all post types
interface BasePostData {
  _id: string;
  type: string;
  photoUrl: string;
  content: string;
  date: string;
  author: string;
}

export interface PetPostData extends BasePostData {
  petName: string;
  petType: string;
}

export interface PlacePostData extends BasePostData {
  placeName: string;
  mapImageUrl?: string;
  placeLatitude?: number;
  placeLongitude?: number;
}

export interface PhotoPostData extends BasePostData {
  placeName?: string;
}

export interface AlbumPostData extends BasePostData {
  albumTitle: string;
  albumId: string;
}

export type PostData =
  | PetPostData
  | PlacePostData
  | PhotoPostData
  | AlbumPostData;

export interface PostComponentProps {
  postData: PostData;
  showMemento?: boolean;
  isFeed?: boolean;
}
