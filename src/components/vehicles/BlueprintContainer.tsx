import React from 'react';
import './BlueprintStyles.css';

interface BlueprintContainerProps {
  children: React.ReactNode;
  isActive: boolean;
  width?: string | number;
  height?: string | number;
}

const BlueprintContainer: React.FC<BlueprintContainerProps> = ({
  children,
  isActive,
  width = '100%',
  height,
}) => {
  if (!isActive) return <>{children}</>;

  return (
    <div className="blueprint-mode" style={{ width, height }}>
      <svg className="blueprint-grid-bg" aria-hidden="true">
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
      </svg>
      <div className="blueprint-svg-wrapper">
        {children}
      </div>
    </div>
  );
};

export default BlueprintContainer;
