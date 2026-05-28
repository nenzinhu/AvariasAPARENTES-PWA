import html2pdf from 'html2pdf.js';
import { Damage, VehicleInfo, VehicleType } from '../types';

export const generateJSON = (vehicleInfo: VehicleInfo, damages: Damage[]) => {
  const data = {
    metadata: {
      generatedAt: new Date().toISOString(),
      appName: 'Avarias APARENTES PWA'
    },
    vehicleInfo,
    damages
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  return blob;
};

export const generateCSV = (damages: Damage[]) => {
  const headers = ['Peça', 'Tipo', 'Gravidade', 'Vista', 'Observações', 'Fotos (Qtde)'];
  const rows = damages.map(d => [
    d.partName,
    d.typeName,
    d.severity,
    d.view,
    d.notes.replace(/\n/g, ' '),
    d.photos.length
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
};

export const buildPdfTemplate = (vehicleInfo: VehicleInfo, damages: Damage[]) => {
  const container = document.createElement('div');
  container.className = 'pdf-report';
  container.style.padding = '40px';
  container.style.fontFamily = 'sans-serif';
  container.style.color = '#1e293b';

  const header = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px;">
      <div>
        <h1 style="margin: 0; font-size: 24px; font-weight: 900; color: #1e293b;">RELATÓRIO DE VISTORIA</h1>
        <p style="margin: 5px 0 0; font-size: 12px; color: #64748b;">Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 900; color: #3b82f6;">AVARIAS APARENTES</div>
        <div style="font-size: 10px; color: #64748b;">v1.2.0</div>
      </div>
    </div>
  `;

  const infoSection = `
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
      <div>
        <div style="font-size: 10px; font-weight: 900; color: #64748b; text-transform: uppercase;">Proprietário</div>
        <div style="font-size: 14px; font-weight: 700; color: #1e293b;">${vehicleInfo.owner || 'Não informado'}</div>
      </div>
      <div>
        <div style="font-size: 10px; font-weight: 900; color: #64748b; text-transform: uppercase;">Telefone</div>
        <div style="font-size: 14px; font-weight: 700; color: #1e293b;">${vehicleInfo.phone || 'Não informado'}</div>
      </div>
      <div>
        <div style="font-size: 10px; font-weight: 900; color: #64748b; text-transform: uppercase;">Marca / Modelo</div>
        <div style="font-size: 14px; font-weight: 700; color: #1e293b;">${vehicleInfo.brand || 'Não informado'}</div>
      </div>
      <div>
        <div style="font-size: 10px; font-weight: 900; color: #64748b; text-transform: uppercase;">Placa</div>
        <div style="font-size: 14px; font-weight: 700; color: #1e293b;">${vehicleInfo.plate || 'Não informado'}</div>
      </div>
    </div>
  `;

  let damagesList = `<h2 style="font-size: 18px; font-weight: 900; margin-bottom: 20px;">Avarias Registradas (${damages.length})</h2>`;
  
  damages.forEach((d, idx) => {
    const severityColor = d.severity === 'high' ? '#ef4444' : d.severity === 'medium' ? '#f97316' : '#eab308';
    damagesList += `
      <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 20px; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <div>
            <div style="font-size: 14px; font-weight: 900;">${idx + 1}. ${d.partName}</div>
            <div style="font-size: 10px; font-weight: 900; color: #64748b; text-transform: uppercase;">${d.typeName} • ${d.view}</div>
          </div>
          <div style="padding: 4px 10px; border-radius: 20px; background: ${severityColor}; color: white; font-size: 10px; font-weight: 900; text-transform: uppercase;">
            ${d.severity}
          </div>
        </div>
        ${d.notes ? `<p style="font-size: 12px; color: #334155; background: #f1f5f9; padding: 10px; border-radius: 8px; margin-top: 0;">${d.notes}</p>` : ''}
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 15px;">
          ${d.photos.map(p => `<img src="${p}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0;" />`).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = header + infoSection + damagesList;
  return container;
};

export const exportPDF = async (vehicleInfo: VehicleInfo, damages: Damage[]) => {
  const element = buildPdfTemplate(vehicleInfo, damages);
  const opt = {
    margin: 10,
    filename: `vistoria-${vehicleInfo.plate || 'sem-placa'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  return html2pdf().from(element).set(opt).save();
};

export const shareReport = async (blob: Blob, filename: string, title: string) => {
  const file = new File([blob], filename, { type: blob.type });
  const nav = navigator as any;

  if (nav.canShare && nav.canShare({ files: [file] })) {
    try {
      await nav.share({
        files: [file],
        title: title,
        text: 'Segue o relatório de vistoria veicular.'
      });
      return true;
    } catch (err) {
      console.error('Share failed:', err);
      return false;
    }
  }
  return false;
};
