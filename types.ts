import React from 'react';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface MediaItem {
  id: string;
  file?: File; // Made optional to support existing DB items
  previewUrl: string;
  type: 'image' | 'video' | 'audio';
  isExisting?: boolean; // Flag to track if it's from DB
}

export type FamilyRole =
  | 'Pai'
  | 'Mãe'
  | 'Cônjuge'
  | 'Filho(a)'
  | 'Irmão/Irmã'
  | 'Avô'
  | 'Avó'
  | 'Neto(a)'
  | 'Tio(a)'
  | 'Sobrinho(a)'
  | 'Outro';

export interface FamilyTreeMember {
  id: string;
  name: string;
  role: FamilyRole;
  birthYear?: string;
  deathYear?: string;
  notes?: string;
  order?: number;
  isExisting?: boolean;
}

export interface MemorialFormData {
  name: string;
  relationship: string;
  birthDate: string;
  deathDate: string;
  biography: string;
  isPublic: boolean;
  memories: string;
  timeline: TimelineEvent[];
  familyTree: FamilyTreeMember[];

  coverImage: string | null;
  profileImage: string | null;

  gallery: MediaItem[];
  videos: MediaItem[];
  audios: MediaItem[];
}

export interface Memorial {
  id: string;
  user_id: string;
  name: string;
  relationship: string;
  birth_date: string | null;
  death_date: string | null;
  biography: string;
  is_public: boolean;
  cover_image_url: string | null;
  profile_image_url: string | null;
  created_at: string;
  status?: boolean; // New field for Admin Dashboard (true = ON/Paid, false = OFF/Pending)
}

export interface GeneratedContent {
  biography: string;
}