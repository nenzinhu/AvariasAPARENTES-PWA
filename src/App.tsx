import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, Bike, Truck, Bus, Smartphone,
  FileText, Share2, Info, Moon, Sun,
  AlertTriangle, ZoomIn, ZoomOut, RotateCcw, Move,
  Maximize, Minimize
} from 'lucide-react';

import { useTranslation } from 'react-i18next';

import { useDamageRegistry } from './hooks/useDamageRegistry';
import { useTTS } from './hooks/useTTS';
import { useDynamicLighting } from './hooks/useDynamicLighting';
import { Damage, VehicleType, ViewType, Severity, DamageType, VehicleInfo } from './types';
import { db } from './lib/db';
import { compressImage, fileToDataUrl } from './lib/imageUtils';
import { exportPDF, generateJSON, generateCSV, shareReport } from './lib/reportUtils';

import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Alert } from './components/ui/Alert';
import { Modal } from './components/ui/Modal';
import { OfflineBanner } from './components/OfflineBanner';
import { DamageList } from './components/DamageList';
import { VehicleInfoForm } from './components/VehicleInfoForm';
import { WizardProgress } from './components/WizardProgress';
import { useSvgZoomPan } from './hooks/useSvgZoomPan';

import { VehicleRegistry } from './components/vehicles/registry';
import VehicleDefs from './components/vehicles/VehicleDefs';

const App: React.FC = () => {
  const { t } = useTranslation();
  const [vehicleType, setVehicleType] = useState<VehicleType>('car');
  const [viewType, setViewType] = useState<ViewType>('lateral-left');
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [selectedPartName, setSelectedPartName] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBlueprintMode, setIsBlueprintMode] = useState(false);
  const [isWizardMode, setIsWizardMode] = useState(true);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [inspectedViews, setInspectedViews] = useState<Record<ViewType, boolean>>({
    'lateral-left': false,
    'lateral-right': false,
    frontal: false,
    traseira: false
  });
  const [approvedForSignature, setApprovedForSignature] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const zoomResetKey = `${vehicleType}-${viewType}`;
  const [photoTargetId, setPhotoTargetId] = useState<string | null>(null);
  const [pendingDamage, setPendingDamage] = useState<Damage | null>(null);

  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
    owner: '',
    phone: '',
    brand: '',
    plate: '',
    generalNotes: ''
  });

  const { damages, addDamage, removeDamage, updateDamage, clearDamages } = useDamageRegistry();
  const { speak } = useTTS();
  const svgRef = useRef<SVGSVGElement>(null);
  const { scale: zoomScale, zoomIn, zoomOut, reset: resetZoom } = useSvgZoomPan(svgRef, {
    resetKey: zoomResetKey,
  });
  useDynamicLighting(svgRef);

  // Persistence for UI State (Metadata in IDB)
  useEffect(() => {
    const loadUIState = async () => {
      const info = await db.getMetadata('vehicle_info');
      if (info) setVehicleInfo(info);
      
      const step = await db.getMetadata('wizard_step');
      if (step !== undefined) setWizardStep(step);

      const views = await db.getMetadata('inspected_views');
      if (views) setInspectedViews(views);

      const sigName = await db.getMetadata('signature_name');
      if (sigName) setSignatureName(sigName);

      const sigApproved = await db.getMetadata('signature_approved');
      if (sigApproved !== undefined) setApprovedForSignature(sigApproved);
    };
    loadUIState();
  }, []);

  useEffect(() => { db.saveMetadata('vehicle_info', vehicleInfo); }, [vehicleInfo]);
  useEffect(() => { db.saveMetadata('wizard_step', wizardStep); }, [wizardStep]);
  useEffect(() => { db.saveMetadata('inspected_views', inspectedViews); }, [inspectedViews]);
  useEffect(() => { db.saveMetadata('signature_name', signatureName); }, [signatureName]);
  useEffect(() => { db.saveMetadata('signature_approved', approvedForSignature); }, [approvedForSignature]);

  const WIZARD_VIEWS: ViewType[] = ['lateral-left', 'lateral-right', 'frontal', 'traseira'];

  const currentVehicleDamages = useMemo(() => {
    return damages.filter(d => d.vehicle === vehicleType);
  }, [damages, vehicleType]);

  const viewPendingCount = (view: ViewType) => {
    return currentVehicleDamages
      .filter(d => d.view === view)
      .filter(d => d.photos.length === 0 && d.notes.trim().length === 0).length;
  };

  const viewHasAnyDamages = (view: ViewType) => currentVehicleDamages.some(d => d.view === view);

  const isValidPlate = (plate: string) => {
    const p = plate.replace(/[^a-zA-Z0-9]/g, '');
    return /^[A-Z]{3}[0-9]{4}$/.test(p) || /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(p);
  };

  const isValidPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10 || digits.length === 11;
  };

  const canAdvanceWizard = () => {
    if (!isWizardMode) return true;
    if (wizardStep === 0) return vehicleInfo.owner.trim().length > 0 && isValidPhone(vehicleInfo.phone) && isValidPlate(vehicleInfo.plate);
    if (wizardStep >= 1 && wizardStep <= 4) {
      const view = WIZARD_VIEWS[wizardStep - 1];
      return viewPendingCount(view) === 0 && (viewHasAnyDamages(view) || inspectedViews[view]);
    }
    if (wizardStep === 5) return approvedForSignature && signatureName.trim().length > 2;
    return true;
  };

  const handlePartClick = (partId: string, partName: string) => {
    setSelectedPartId(partId);
    setSelectedPartName(partName);
    speak(partName);
  };

  const registerDamage = (type: DamageType, typeName: string) => {
    if (!selectedPartId) return;
    const severity: Severity = type === 'scratch' ? 'low' : type === 'dent' ? 'medium' : 'high';
    
    const damage: Damage = {
      id: Date.now().toString(),
      vehicle: vehicleType,
      view: viewType,
      partId: selectedPartId,
      partName: selectedPartName,
      type,
      typeName,
      severity,
      notes: '',
      photos: []
    };

    if (window.confirm(t('damage_registration.confirm_photo'))) {
      setPendingDamage(damage);
      fileInputRef.current?.click();
    } else {
      addDamage(damage);
      speak(`${damage.partName} registrado sem foto.`);
    }
  };

  const handlePhotoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const rawData = await fileToDataUrl(file);
      const compressed = await compressImage(rawData);

      if (photoTargetId) {
        const damage = damages.find(d => d.id === photoTargetId);
        if (damage) {
          updateDamage(photoTargetId, { photos: [...damage.photos, compressed] });
        }
        setPhotoTargetId(null);
      } else if (pendingDamage) {
        addDamage({ ...pendingDamage, photos: [compressed] });
        setPendingDamage(null);
        speak(`${pendingDamage.partName} registrado com foto.`);
      }
    } catch (error) {
      console.error('Photo processing failed:', error);
    }
    e.target.value = '';
  };

  const handleExport = async (format: 'pdf' | 'json' | 'csv') => {
    setIsGenerating(true);
    try {
      if (format === 'pdf') {
        await exportPDF(vehicleInfo, currentVehicleDamages);
      } else if (format === 'json') {
        const blob = generateJSON(vehicleInfo, currentVehicleDamages);
        const shared = await shareReport(blob, `vistoria-${vehicleInfo.plate || 'sem-placa'}.json`, 'Vistoria (JSON)');
        if (!shared) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `vistoria-${vehicleInfo.plate || 'sem-placa'}.json`;
          a.click();
        }
      } else if (format === 'csv') {
        const blob = generateCSV(currentVehicleDamages);
        const shared = await shareReport(blob, `vistoria-${vehicleInfo.plate || 'sem-placa'}.csv`, 'Vistoria (CSV)');
        if (!shared) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `vistoria-${vehicleInfo.plate || 'sem-placa'}.csv`;
          a.click();
        }
      }
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsGenerating(false);
      setIsExportModalOpen(false);
    }
  };

  const wizardSteps = [
    { idx: 0, label: t('wizard.steps.data'), isDone: vehicleInfo.owner.trim().length > 0 && isValidPhone(vehicleInfo.phone) && isValidPlate(vehicleInfo.plate) },
    ...WIZARD_VIEWS.map((v, i) => ({
      idx: i + 1,
      label: v.replace('-', ' ').toUpperCase(),
      isDone: viewPendingCount(v) === 0 && (viewHasAnyDamages(v) || inspectedViews[v]),
      hasPending: viewPendingCount(v) > 0,
      pendingCount: viewPendingCount(v)
    })),
    { idx: 5, label: t('wizard.steps.review'), isDone: approvedForSignature && signatureName.trim().length > 2 }
  ];

  useEffect(() => {
    if (isWizardMode && wizardStep >= 1 && wizardStep <= 4) {
      setViewType(WIZARD_VIEWS[wizardStep - 1]);
      setSelectedPartId(null);
    }
  }, [wizardStep, isWizardMode]);

  const renderVehicle = () => {
    const commonProps = {
      damages: currentVehicleDamages,
      selectedPartId,
      onPartClick: handlePartClick,
      onPartHover: () => {},
      svgRef,
      isBlueprintMode
    };

    const Comp = VehicleRegistry[vehicleType][viewType];
    return <Comp {...commonProps} />;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950 text-slate-200' : 'light bg-slate-50 text-slate-900'}`}>
      <OfflineBanner />
      <VehicleDefs />
      
      <header className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 text-white">
            <Car size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            {t('app.title')}
          </h1>
        </motion.div>
        <p className="text-slate-500 max-w-2xl text-center font-medium">
          {t('app.subtitle')}
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isWizardMode && (
          <section className="lg:col-span-3">
            <div className="glass-card p-6">
              <WizardProgress
                currentStep={wizardStep}
                steps={wizardSteps}
                onStepClick={setWizardStep}
                onPrev={() => setWizardStep(s => Math.max(0, s - 1))}
                onNext={() => setWizardStep(s => Math.min(5, s + 1))}
                canNext={canAdvanceWizard()}
              />
              
              {wizardStep >= 1 && wizardStep <= 4 && !viewHasAnyDamages(WIZARD_VIEWS[wizardStep - 1]) && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
                      checked={inspectedViews[WIZARD_VIEWS[wizardStep - 1]]}
                      onChange={e => setInspectedViews(prev => ({ ...prev, [WIZARD_VIEWS[wizardStep - 1]]: e.target.checked }))}
                    />
                    {t('vehicle_info.inspected_view')}
                  </label>
                </div>
              )}

              {wizardStep === 5 && (
                <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t('vehicle_info.signature_label')}
                    value={signatureName}
                    onChange={e => setSignatureName(e.target.value)}
                    placeholder={t('vehicle_info.signature_placeholder')}
                  />
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
                        checked={approvedForSignature}
                        onChange={e => setApprovedForSignature(e.target.checked)}
                      />
                      {t('vehicle_info.confirmation')}
                    </label>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
        
        <section className="lg:col-span-3">
          <div className="glass-card p-6">
            <VehicleInfoForm info={vehicleInfo} onChange={setVehicleInfo} />
          </div>
        </section>

  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
...
        <section className={`${isFullscreenMode ? 'fixed inset-0 z-50 p-4 bg-slate-950' : 'lg:col-span-2'} space-y-6`}>
          {!isFullscreenMode && (
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { id: 'car', icon: Car, label: t('vehicle_types.car') },
                { id: 'moto', icon: Bike, label: t('vehicle_types.moto') },
                { id: 'truck', icon: Truck, label: t('vehicle_types.truck') },
                { id: 'bus', icon: Bus, label: t('vehicle_types.bus') },
                { id: 'van', icon: Smartphone, label: t('vehicle_types.van') },
              ].map(v => (
                <Button
                  key={v.id}
                  variant={vehicleType === v.id ? 'primary' : 'secondary'}
                  onClick={() => setVehicleType(v.id as VehicleType)}
                  className="flex-1 min-w-[100px]"
                >
                  <v.icon size={18} className="mr-2" />
                  {v.label}
                </Button>
              ))}
            </div>
          )}

          {!isFullscreenMode && (
            <div className="flex flex-wrap justify-center gap-2">
              {WIZARD_VIEWS.map(v => (
                <Button
                  key={v}
                  variant={viewType === v ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewType(v as ViewType)}
                >
                  {v.replace('-', ' ').toUpperCase()}
                </Button>
              ))}
            </div>
          )}

          <div className={`glass-card p-8 flex items-center justify-center relative overflow-hidden ${isFullscreenMode ? 'h-full' : 'min-h-[400px]'}`}>
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
                onClick={() => setIsFullscreenMode(!isFullscreenMode)}
                aria-label={isFullscreenMode ? t('ui.exit_fullscreen') : t('ui.fullscreen')}
                title={isFullscreenMode ? t('ui.exit_fullscreen') : t('ui.fullscreen')}
              >
                {isFullscreenMode ? <Minimize size={14} /> : <Maximize size={14} />} 
              </Button>
              <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-wide text-slate-400 bg-slate-900/70 backdrop-blur px-3 py-2 rounded-full border border-white/5">
                <Move size={12} />
                {t('ui.drag_to_move')}
              </div>
              <div className="flex items-center gap-1 bg-slate-900/70 backdrop-blur px-2 py-2 rounded-full border border-white/5">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={zoomOut}
                  aria-label="Diminuir zoom"
                  title="Diminuir zoom"
                >
                  <ZoomOut size={14} />
                </Button>
                <span className="min-w-[52px] text-center text-[10px] font-black text-slate-300">
                  {Math.round(zoomScale * 100)}%
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={zoomIn}
                  aria-label="Aumentar zoom"
                  title="Aumentar zoom"
                >
                  <ZoomIn size={14} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={resetZoom}
                  aria-label="Redefinir zoom"
                  title="Redefinir zoom"
                >
                  <RotateCcw size={14} />
                </Button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${vehicleType}-${viewType}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.05, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl"
              >
                {renderVehicle()}
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 bg-slate-900/50 backdrop-blur px-3 py-1.5 rounded-full border border-white/5">
              <Info size={12} />
              {t('ui.touch_to_mark')}
            </div>
          </div>

          {selectedPartId && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-6 border-blue-500/30 bg-blue-600/5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Peça: <span className="text-blue-400">{selectedPartName}</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'scratch', label: 'Risco', emoji: '✏️', color: 'hover:bg-yellow-500/10 hover:border-yellow-500/30' },
                  { id: 'dent', label: 'Amasso', emoji: '🔨', color: 'hover:bg-orange-500/10 hover:border-orange-500/30' },
                  { id: 'broken', label: 'Quebra', emoji: '💥', color: 'hover:bg-red-500/10 hover:border-red-500/30' },
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => registerDamage(type.id as DamageType, type.label)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-900/50 border border-white/5 transition-all group ${type.color}`}
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">{type.emoji}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-500 group-hover:text-slate-300">{type.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </section>

        <section className="space-y-6">
          <div className="glass-card p-6 flex flex-col h-full min-h-[500px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-blue-500">
                <FileText size={20} />
                {t('ui.damages')} ({currentVehicleDamages.length})
              </h2>
              {currentVehicleDamages.length > 0 && (
                <button onClick={() => setIsClearModalOpen(true)} className="text-[10px] font-black text-red-400 hover:text-red-300 transition-colors uppercase">
                  {t('ui.clear_all')}
                </button>
              )}
            </div>

            <DamageList
              damages={currentVehicleDamages}
              onRemove={removeDamage}
              onUpdate={updateDamage}
              onAddPhoto={(id) => {
                setPhotoTargetId(id);
                fileInputRef.current?.click();
              }}
            />

            <div className="mt-auto pt-6 space-y-3">
              <Button 
                variant="success" 
                className="w-full"
                onClick={() => setIsExportModalOpen(true)}
              >
                <Share2 size={18} className="mr-2" />
                {t('ui.export_share')}
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" size="sm" onClick={() => setIsBlueprintMode(!isBlueprintMode)}>
                  {isBlueprintMode ? t('ui.real_view') : t('ui.blueprint')}
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setIsDarkMode(!isDarkMode)}>
                  {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handlePhotoCapture} 
        accept="image/*" 
        capture="environment" 
        className="hidden" 
      />

      {/* Export Modal */}
      <Modal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
        title={t('ui.export_report')}
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-400">{t('ui.choose_format')} <span className="text-white font-bold">{vehicleInfo.plate || 'veículo sem placa'}</span>.</p>
          <div className="grid grid-cols-1 gap-3">
            <Button variant="primary" className="justify-start h-14" onClick={() => handleExport('pdf')} isLoading={isGenerating}>
              <FileText size={20} className="mr-3" />
              Relatório em PDF (Profissional)
            </Button>
            <Button variant="secondary" className="justify-start h-14" onClick={() => handleExport('json')}>
              <Smartphone size={20} className="mr-3" />
              Exportar JSON (Dados brutos)
            </Button>
            <Button variant="secondary" className="justify-start h-14" onClick={() => handleExport('csv')}>
              <FileText size={20} className="mr-3" />
              Exportar CSV (Excel)
            </Button>
          </div>
        </div>
      </Modal>

      {/* Clear Modal */}
      <Modal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        title="Limpar todos os dados?"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-red-400">
            <AlertTriangle size={32} />
            <p className="text-sm font-bold">Esta ação é irreversível. Todas as avarias e fotos deste veículo serão apagadas.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setIsClearModalOpen(false)}>Cancelar</Button>
            <Button variant="danger" className="flex-1" onClick={() => { clearDamages(); setIsClearModalOpen(false); }}>Sim, Limpar Tudo</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
