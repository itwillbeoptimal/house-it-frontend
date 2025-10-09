import React, { useEffect } from 'react';
import useModal from '@/hooks/useModal';
import eventManager from '@/utils/eventManager';

const EventHandler = () => {
  const { openModal, confirm, alert } = useModal();

  useEffect(() => {
    const handleConfirm = (...args: unknown[]) => {
      const data = args[0] as {
        title: string;
        content: React.ReactNode;
        onConfirm: () => void;
        confirmText?: string;
        cancelText?: string;
      };
      confirm(data);
    };

    const handleAlert = (...args: unknown[]) => {
      const data = args[0] as {
        title: string;
        content: React.ReactNode;
        onConfirm?: () => void;
        confirmText?: string;
      };
      alert(data);
    };

    eventManager.on('confirm', handleConfirm);
    eventManager.on('alert', handleAlert);

    return () => {
      eventManager.off('confirm', handleConfirm);
      eventManager.off('alert', handleAlert);
    };
  }, [openModal, confirm, alert]);

  return null;
};

export default EventHandler;
