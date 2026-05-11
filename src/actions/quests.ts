'use server';

import { Quest } from '@/utils/interfaces';
import { NEXT_PUBLIC_API_BASE_URL } from '@/utils/config';

export const getAllQuests = async (): Promise<Quest[]> => {
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/quests`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch quests');
  }
  return response.json();
};

export const getQuestById = async (id: string): Promise<Quest> => {
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/quests/${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Quest not found');
  }
  return response.json();
};
