import React from 'react';
import { useTranslation } from 'react-i18next';
import { VehicleInfo } from '../types';
import { Input } from './ui/Input';

interface VehicleInfoFormProps {
  info: VehicleInfo;
  onChange: (info: VehicleInfo) => void;
}

export const VehicleInfoForm: React.FC<VehicleInfoFormProps> = ({ info, onChange }) => {
  const { t } = useTranslation();
  const normalizePhoneDigits = (value: string) => value.replace(/\D/g, '').slice(0, 11);

  const formatPhoneBR = (digits: string) => {
    if (digits.length <= 2) return digits ? `(${digits}` : '';
    const ddd = digits.slice(0, 2);
    const rest = digits.slice(2);
    if (rest.length <= 4) return `(${ddd}) ${rest}`;
    if (rest.length <= 8) return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
    return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
  };

  const normalizePlate = (value: string) =>
    value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 7);

  const isValidPlate = (plate: string) => {
    const p = normalizePlate(plate);
    const oldBR = /^[A-Z]{3}[0-9]{4}$/;
    const mercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
    return p.length === 0 || oldBR.test(p) || mercosul.test(p);
  };

  const isValidPhone = (phone: string) => {
    const digits = normalizePhoneDigits(phone);
    return digits.length === 0 || digits.length === 10 || digits.length === 11;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        label={t('vehicle_info.workshop')}
        value={info.workshop || ''}
        onChange={e => onChange({ ...info, workshop: e.target.value })}
        placeholder={t('vehicle_info.workshop_placeholder')}
      />
      <Input
        label={t('vehicle_info.os_number')}
        value={info.osNumber || ''}
        onChange={e => onChange({ ...info, osNumber: e.target.value })}
        placeholder={t('vehicle_info.os_number_placeholder')}
      />
      <Input
        label={t('vehicle_info.owner')}
        value={info.owner}
        onChange={e => onChange({ ...info, owner: e.target.value })}
        placeholder={t('vehicle_info.owner_placeholder')}
      />
      <Input
        label={t('vehicle_info.phone')}
        value={info.phone}
        onChange={e => {
          const digits = normalizePhoneDigits(e.target.value);
          onChange({ ...info, phone: formatPhoneBR(digits) });
        }}
        placeholder={t('vehicle_info.phone_placeholder')}
        error={!isValidPhone(info.phone) ? t('vehicle_info_form.phone_invalid') : undefined}
      />
      <Input
        label={t('vehicle_info.brand_model')}
        value={info.brand}
        onChange={e => onChange({ ...info, brand: e.target.value })}
        placeholder={t('vehicle_info.brand_model_placeholder')}
      />
      <Input
        label={t('vehicle_info.plate')}
        value={info.plate}
        onChange={e => onChange({ ...info, plate: normalizePlate(e.target.value) })}
        placeholder={t('vehicle_info.plate_placeholder')}
        error={!isValidPlate(info.plate) ? t('vehicle_info_form.plate_invalid') : undefined}
      />
    </div>
  );
};
