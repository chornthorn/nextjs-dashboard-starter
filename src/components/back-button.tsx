'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  onClick?: () => void;
  label?: string;
}

const BackButton = ({ onClick, label }: BackButtonProps) => {
  const router = useRouter();

  const goBack = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button className="flex pb-4" onClick={goBack}>
      <ArrowLeft />
      <p className="ml-2">{label ? label : 'Back'}</p>
    </button>
  );
};

export default BackButton;
