import React from 'react';
import { Damage, VehicleInfo } from '../types';

interface ReportProps {
  vehicleInfo: VehicleInfo;
  damages: Damage[];
  vehicleType: string;
}

export const ReportTemplate = React.forwardRef<HTMLDivElement, ReportProps>(
  ({ vehicleInfo, damages, vehicleType }, ref) => {
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
          <div className="title">Relatório de Vistoria de Danos</div>
          <p style={{ color: '#6b7280' }}>Data: {new Date().toLocaleDateString()}</p>
        </header>

        <section className="section">
          <h3>Dados do Veículo</h3>
          <div className="data-grid">
            <p><strong>Proprietário:</strong> {vehicleInfo.owner}</p>
            <p><strong>Telefone:</strong> {vehicleInfo.phone}</p>
            <p><strong>Marca/Modelo:</strong> {vehicleInfo.brand}</p>
            <p><strong>Placa:</strong> {vehicleInfo.plate}</p>
          </div>
        </section>

        <section className="section">
          <h3>Mapa de Danos</h3>
          <p>Tipo de Veículo: {vehicleType.toUpperCase()}</p>
          <div style={{ textAlign: 'center', color: '#888', padding: '40px', border: '1px dashed #ccc', marginTop: '10px' }}>
            [Área reservada para representação visual das 4 vistas do veículo]
          </div>
        </section>

        <section className="section">
          <h3>Detalhes das Avarias</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Peça</th>
                <th>Tipo</th>
                <th>Severidade</th>
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
                  <td colSpan={3} style={{ textAlign: 'center' }}>Nenhuma avaria registrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
);
