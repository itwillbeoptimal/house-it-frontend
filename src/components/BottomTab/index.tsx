import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from '@/components/BottomTab/BottomTab.styles';
import TABS from '@/components/BottomTab/constants/tabs';

interface BottomTabItemProps {
  activeIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  inactiveIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
  onClick: () => void;
}

const getInitialTab = (pathname: string): string => {
  const currentTab = TABS.find((tab) => tab.path === pathname);
  return currentTab ? currentTab.label : TABS[0].label;
};

const BottomTabItem: React.FC<BottomTabItemProps> = ({
  activeIcon: ActiveIcon,
  inactiveIcon: InactiveIcon,
  isActive,
  onClick,
}) => (
  <S.TabItem
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    role="button"
    tabIndex={0}
  >
    <S.IconContainer>
      {isActive ? <ActiveIcon /> : <InactiveIcon />}
    </S.IconContainer>
  </S.TabItem>
);

const BottomTab = () => {
  const [activeTab, setActiveTab] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveTab(getInitialTab(location.pathname));
  }, [location.pathname]);

  const handleTabClick = (tabName: string, path: string) => {
    setActiveTab(tabName);
    navigate(path);
  };

  return (
    <S.Footer>
      <S.TabContainer>
        {TABS.map(({ activeIcon, inactiveIcon, label, path }) => (
          <BottomTabItem
            key={label}
            activeIcon={activeIcon}
            inactiveIcon={inactiveIcon}
            isActive={activeTab === label}
            onClick={() => handleTabClick(label, path)}
          />
        ))}
      </S.TabContainer>
    </S.Footer>
  );
};

export default BottomTab;
