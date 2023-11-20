import { movieType } from '@/lib/types/movie';
import { StaticImageData } from 'next/image';
import { SetStateAction } from 'react';

type TracksData = {
  name: string;
  artist: string;
  img: string;
};

export type CardData = {
  id: number;
  title: string;
  image_url: StaticImageData;
  age: number;
  bio: string;
  genre: string[];
  tracks: TracksData[];
};

export type CardProps = {
  data: movieType;
  active: boolean;
  removeCard: (id: string, action: 'right' | 'left') => void;
};

export type SwipeButtonProps = {
  exit: (value: SetStateAction<number>) => void;
  removeCard: (id: string, action: 'right' | 'left') => void;
  id: string;
};