import React from 'react';
import { useTranslation } from 'react-i18next';
import { Damage, VehicleInfo } from '../types';

interface ReportProps {
  vehicleInfo: VehicleInfo;
  damages: Damage[];
  vehicleType: string;
}

export const ReportTemplate = React.forwardRef<HTMLDivElement, ReportProps>(
  ({ vehicleInfo, damages, vehicleType }, ref) => {
    const { t } = useTranslation();
    return (
      <div ref={ref} className="pdf-container" style={{ padding: '40px', fontFamily: 'Arial, sans-serif', color: '#000', backgroundColor: 'white' }}>
        <style>{`
          .pdf-container { width: 100%; }
          .header { border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 20px; }
          .title { font-size: 28px; font-weight: bold; color: #1e3a8a; margin-bottom: 5px; }
          .section { margin-bottom: 30px; }
          .section h3 { border-bottom: 1px solid #eee; padding-bottom: 5px; color: #374151; }
          .data-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          .table th { background-color: #f3f4f6; color: #111827; }
        `}</style>

        <header className="header">
          <div className="title">{t('report_template.title')}</div>
          <p style={{ color: '#6b7280' }}>{t('report_template.date', { date: new Date().toLocaleDateString() })}</p>
        </header>

        <section className="section">
          <h3>{t('report_template.vehicle_data')}</h3>
          <div className="data-grid">
            {vehicleInfo.workshop && <p><strong>{t('report_template.workshop')}:</strong> {vehicleInfo.workshop}</p>}
            {vehicleInfo.osNumber && <p><strong>{t('report_template.os_number')}:</strong> {vehicleInfo.osNumber}</p>}
            <p><strong>{t('report_template.owner')}:</strong> {vehicleInfo.owner}</p>
            <p><strong>{t('report_template.phone')}:</strong> {vehicleInfo.phone}</p>
            <p><strong>{t('report_template.brand_model')}:</strong> {vehicleInfo.brand}</p>
            <p><strong>{t('report_template.plate')}:</strong> {vehicleInfo.plate}</p>
          </div>
        </section>

        <section className="section">
          <h3>{t('report_template.damage_map')}</h3>
          <p>{t('report_template.vehicle_type')}: {vehicleType.toUpperCase()}</p>
          <div style={{ textAlign: 'center', color: '#888', padding: '40px', border: '1px dashed #ccc', marginTop: '10px' }}>
            {t('report_template.visual_placeholder')}
          </div>
        </section>

        <section className="section">
          <h3>{t('report_template.damage_details')}</h3>
          <table className="table">
            <thead>
              <tr>
                <th>{t('report_template.part')}</th>
                <th>{t('report_template.type')}</th>
                <th>{t('report_template.severity')}</th>
              </tr>
            </thead>
            <tbody>
              {damages.length > 0 ? (
                damages.map(d => (
                  <tr key={d.id}>
                    <td>{d.partName} ({d.view.replace('-', ' ')})</td>
                    <td>{d.typeName}</td>
                    <td style={{ fontWeight: 'bold' }}>{d.severity.toUpperCase()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center' }}>{t('report_template.no_damages')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
);
