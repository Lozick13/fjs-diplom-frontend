import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  createSupportRequest,
  getSupportRequestsList,
  setCurrentRequest,
  type SupportRequest,
} from '../../redux/slices/supportSlice';
import {
  connectWebSocket,
  disconnectWebSocket,
  subscribeToRequest,
  unsubscribeFromRequest,
} from '../../redux/store/websocket';
import BaseButton from '../../UI/buttons/BaseButton/BaseButton';
import IconButton from '../../UI/buttons/IconButton/IconButton';
import ChatInput from '../../UI/Inputs/ChatInput/ChatInput';
import ChatPreview from '../ChatPreview/ChatPreview';
import './chatslist.scss';

const ChatsList: React.FC = () => {
  // hooks
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { requests } = useAppSelector(state => state.support);

  // states
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');

  //WebSocket
  useEffect(() => {
    if (user) {
      connectWebSocket(user.id, user.name, user.role);
      return () => disconnectWebSocket();
    }
  }, [user, user?.id]);

  // subscribe ro requests
  useEffect(() => {
    requests.forEach(request => subscribeToRequest(request.id));

    return () => {
      requests.forEach(request => {
        unsubscribeFromRequest(request.id);
      });
    };
  }, [requests]);

  //requests list
  useEffect(() => {
    if (!user || user?.role === 'admin') return;
    dispatch(getSupportRequestsList(user.role));
  }, [dispatch, user]);

  // format date
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

  // chat select
  const handleChatSelect = (request: SupportRequest) => {
    dispatch(setCurrentRequest(null));
    dispatch(setCurrentRequest(request));
  };

  // create request
  const handleSubmitNewChat = () => {
    if (newQuestion.trim()) {
      dispatch(createSupportRequest(newQuestion.trim()));
      setIsCreatingNew(false);
      setNewQuestion('');
    }
  };

  return (
    <section className="chats-list">
      <div className="chats-list__header">
        <h2 className="chats-list__title">
          {user?.role === 'manager' ? 'Все обращения' : 'Мои обращения'}
        </h2>

        {!isCreatingNew && user?.role === 'client' && (
          <IconButton icon="add_circle" click={() => setIsCreatingNew(true)} />
        )}
      </div>

      <div className="chats-list__body">
        {requests.length === 0 && <span>Нет активных обращений</span>}

        {isCreatingNew ? (
          <article className="chats-list__create">
            <ChatInput
              rightElement={<IconButton icon="send" click={handleSubmitNewChat} />}
              id="question"
              name="question"
              onEnterPress={handleSubmitNewChat}
              value={newQuestion}
              type="text"
              maxLength={1000}
              change={e => setNewQuestion(e.target.value)}
              placeholder="Опишите Ваш вопрос..."
              required
              textarea
            />

            <BaseButton
              text="Отмена"
              click={() => {
                setIsCreatingNew(false);
                setNewQuestion('');
              }}
            />
          </article>
        ) : (
          requests
            .filter(request => (user?.role === 'manager' ? true : request.isActive))
            .sort((a, b) => {
              if (a.isActive === b.isActive) return 0;
              return a.isActive ? 1 : -1;
            })
            .reverse()
            .map(request => (
              <ChatPreview
                key={request.id}
                click={() => handleChatSelect(request)}
                id={`#${request.id}`}
                date={`Создано: ${formatDate(request.createdAt)}`}
                active={request.isActive}
              />
            ))
        )}
      </div>
    </section>
  );
};

export default ChatsList;
