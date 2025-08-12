import React from 'react';
import ChatsList from '../../components/ChatsList/ChatsList';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import OpenChat from '../../components/OpenChat/OpenChat';
import { useAppSelector } from '../../hooks';
import './supportpage.scss';

const SupportPage: React.FC = () => {
  const { loading } = useAppSelector(state => state.support);

  return (
    <main className="support">
      <ChatsList />
      <OpenChat />
      {loading && (
        <div className="support__loader">
          <LogoLoader started big={true} />
        </div>
      )}
    </main>
  );
};

export default SupportPage;
