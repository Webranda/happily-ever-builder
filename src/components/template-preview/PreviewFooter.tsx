
import React from 'react';

interface PreviewFooterProps {
  template: any;
  partner1Name: string;
  partner2Name: string;
  eventDate: string;
}

const PreviewFooter: React.FC<PreviewFooterProps> = ({ 
  template, 
  partner1Name, 
  partner2Name, 
  eventDate 
}) => {
  return (
    <footer className={template.headerStyle + " text-white text-center py-8"}>
      <p>{partner1Name} & {partner2Name}</p>
      <p className="mt-2">{eventDate}</p>
    </footer>
  );
};

export default PreviewFooter;
