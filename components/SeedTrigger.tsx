'use client';

import { useEffect } from 'react';
import { seedData } from '@/lib/seed';

export default function SeedTrigger() {
  useEffect(() => {
    const hasSeeded = localStorage.getItem('nitrocare_seeded_v2');
    if (!hasSeeded) {
      seedData().then(() => {
        localStorage.setItem('nitrocare_seeded_v2', 'true');
      });
    }
  }, []);

  return null;
}
