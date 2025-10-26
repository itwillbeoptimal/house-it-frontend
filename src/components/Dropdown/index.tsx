import React, { useState, useRef, useEffect } from 'react';
import * as S from '@/components/Dropdown/Dropdown.styles';

export interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (onClick: () => void) => {
    setIsOpen(false);
    onClick();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <S.Container ref={wrapperRef}>
      <S.DropdownButton onClick={handleToggle}>{trigger}</S.DropdownButton>
      {isOpen && (
        <S.Menu>
          {items.map((item) => (
            <S.Item
              key={item.label}
              onClick={() => handleItemClick(item.onClick)}
            >
              {item.label}
            </S.Item>
          ))}
        </S.Menu>
      )}
    </S.Container>
  );
};

export default Dropdown;
