import { useState, useEffect } from 'react';
import { Damage } from '../types';
import { db } from '../lib/db';

export const useDamageRegistry = () => {
  const [damages, setDamages] = useState<Damage[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial data from IndexedDB
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedDamages = await db.getAllDamages();
        setDamages(savedDamages);
      } catch (error) {
        console.error('Failed to load damages from IndexedDB:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const addDamage = async (damage: Damage) => {
    try {
      // Remove existing damage for the same part on the same vehicle if needed
      // Actually, if we support multiple photos, we might want to keep it or just update it.
      // The previous logic was: remove existing damage for the same part.
      const filtered = damages.filter(d => !(d.partId === damage.partId && d.vehicle === damage.vehicle));
      const newDamages = [...filtered, damage];
      setDamages(newDamages);
      await db.saveDamage(damage);
      // If we replaced a damage, we should delete the old one from IDB if it had a different ID
      // But here we are assuming the user wants to REPLACE the damage for that part.
    } catch (error) {
      console.error('Failed to add damage:', error);
    }
  };

  const removeDamage = async (id: string) => {
    try {
      setDamages(prev => prev.filter(d => d.id !== id));
      await db.deleteDamage(id);
    } catch (error) {
      console.error('Failed to remove damage:', error);
    }
  };

  const updateDamage = async (id: string, patch: Partial<Omit<Damage, 'id'>>) => {
    try {
      setDamages(prev => {
        const updated = prev.map(d => (d.id === id ? { ...d, ...patch } : d));
        const affected = updated.find(d => d.id === id);
        if (affected) {
          db.saveDamage(affected);
        }
        return updated;
      });
    } catch (error) {
      console.error('Failed to update damage:', error);
    }
  };

  const toggleDamage = async (damage: Damage) => {
    try {
      const existing = damages.find(d => d.partId === damage.partId && d.vehicle === damage.vehicle && d.type === damage.type);
      if (existing) {
        await removeDamage(existing.id);
      } else {
        await addDamage(damage);
      }
    } catch (error) {
      console.error('Failed to toggle damage:', error);
    }
  };

  const clearDamages = async () => {
    try {
      setDamages([]);
      await db.clearDamages();
    } catch (error) {
      console.error('Failed to clear damages:', error);
    }
  };

  const getDamagesByVehicle = (vehicle: string) => {
    return damages.filter(d => d.vehicle === vehicle);
  };

  return {
    damages,
    loading,
    addDamage,
    removeDamage,
    updateDamage,
    toggleDamage,
    clearDamages,
    getDamagesByVehicle
  };
};
