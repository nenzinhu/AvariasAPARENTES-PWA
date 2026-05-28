import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Camera, AlertTriangle, Plus, X } from 'lucide-react';
import { Damage } from '../types';
import { Button } from './ui/Button';

interface DamageListProps {
  damages: Damage[];
  onRemove: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Damage>) => void;
  onAddPhoto: (id: string) => void;
}

export const DamageList: React.FC<DamageListProps> = ({ 
  damages, 
  onRemove, 
  onUpdate,
  onAddPhoto
}) => {
  return (
    <div className="flex flex-col h-full max-h-[600px]">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
        {damages.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-slate-500 text-sm italic text-center">
            <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-3">
              <Camera size={24} />
            </div>
            Nenhuma avaria registrada.
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {damages.map(damage => (
              <motion.div
                key={damage.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className={`p-4 rounded-xl bg-slate-900/40 border-l-4 ${
                  damage.severity === 'low' ? 'border-yellow-500' :
                  damage.severity === 'medium' ? 'border-orange-500' : 'border-red-500'
                } flex flex-col gap-3 group`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-200">{damage.partName}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-black">
                      {damage.typeName} • {damage.view.replace('-', ' ')}
                    </p>
                  </div>
                  <button 
                    onClick={() => onRemove(damage.id)}
                    className="p-1.5 text-slate-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Photos Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {damage.photos.map((photo, index) => (
                    <div key={index} className="relative group/photo aspect-square rounded-lg overflow-hidden border border-white/5 bg-slate-800">
                      <img 
                        src={photo} 
                        alt={`Avaria ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          const newPhotos = [...damage.photos];
                          newPhotos.splice(index, 1);
                          onUpdate(damage.id, { photos: newPhotos });
                        }}
                        className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover/photo:opacity-100 transition-opacity"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => onAddPhoto(damage.id)}
                    className="aspect-square flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 text-slate-500 hover:text-blue-400 transition-all"
                  >
                    <Plus size={16} />
                    <span className="text-[10px] font-bold">FOTO</span>
                  </button>
                </div>

                {!damage.photos.length && !damage.notes.trim() && (
                  <div className="text-[10px] font-black text-red-300 flex items-center gap-1 bg-red-500/10 p-2 rounded-lg">
                    <AlertTriangle size={12} />
                    Pendência: adicione uma foto ou observação
                  </div>
                )}

                <textarea
                  value={damage.notes}
                  onChange={e => onUpdate(damage.id, { notes: e.target.value })}
                  placeholder="Observações adicionais..."
                  className="w-full bg-slate-950/40 border border-white/5 rounded-lg px-3 py-2 text-xs text-slate-300 outline-none focus:border-blue-500/40 transition-all min-h-[60px] resize-none"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
