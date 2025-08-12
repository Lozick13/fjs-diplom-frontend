import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeRequest, sendMessage } from '../../redux/slices/supportSlice';
import { subscribeToChat } from '../../redux/store/websocket';
import IconButton from '../../UI/buttons/IconButton/IconButton';
import NavigateButton from '../../UI/buttons/NavigateButton/NavigateButton';
import ChatInput from '../../UI/Inputs/ChatInput/ChatInput';
import ChatMessage from '../ChatMessage/ChatMessage';
import './openchat.scss';

const OpenChat: React.FC = () => {
  //hooks
  const dispatch = useAppDispatch();
  const { currentRequest, messages, loading, error } = useAppSelector(
    state => state.support,
  );
  const { user } = useAppSelector(state => state.auth);

  //states
  const [messageText, setMessageText] = useState('');

  //WebSocket
  useEffect(() => {
    if (currentRequest?.id && user) {
      subscribeToChat(currentRequest.id);
    }
  }, [currentRequest?.id, user, user?.id]);

  // close request
  const handleCloseRequest = () => {
    if (currentRequest?.id) {
      dispatch(closeRequest(currentRequest.id));
    }
  };

  // send message
  const handleSendMessage = () => {
    if (messageText.trim() && currentRequest?.id) {
      dispatch(sendMessage(messageText.trim()));
      setMessageText('');
    }
  };

  //auto scroll
  useEffect(() => {
    const chatBody = document.querySelector('.open-chat__body');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <section className="open-chat">
        <div className="open-chat__header">
          {user &&
            currentRequest &&
            user.role === 'manager' &&
            currentRequest.isActive && (
              <div className="open-chat__close">
                <NavigateButton text="Закрыть обращение" click={handleCloseRequest} />
              </div>
            )}

          <h2 className="open-chat__title">
            {error && error}
            {!currentRequest && !loading && 'Выберите обращение'}
            {currentRequest && (
              <>
                Обращение
                <br />#{currentRequest.id}
              </>
            )}
          </h2>

          <span className="open-chat__title-info">
            {!currentRequest &&
              !loading &&
              'Выберите существующее обращение или создайте новое'}

            {user &&
              currentRequest &&
              user.role === 'manager' &&
              currentRequest.client &&
              `Клиент: ${currentRequest.client.name} (${currentRequest.client.email})`}
          </span>
        </div>

        {currentRequest && user && (
          <div className="open-chat__body">
            {messages.length > 0 &&
              messages.map(message => (
                <ChatMessage
                  key={message.id}
                  avatar={
                    message.author.id === user.id
                      ? './assets/owner.png'
                      : './assets/partner.png'
                  }
                  user={message.author.name}
                  message={message.text}
                  time={new Date(message.createdAt).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  owner={message.author.id === user.id}
                />
              ))}
          </div>
        )}
        {currentRequest && user && currentRequest.isActive && (
          <ChatInput
            rightElement={<IconButton icon="send" click={handleSendMessage} />}
            id="message"
            name="message"
            onEnterPress={handleSendMessage}
            value={messageText}
            type="text"
            maxLength={1000}
            change={e => setMessageText(e.target.value)}
            placeholder="Напишите Ваше сообщение"
            required
            textarea
          />
        )}
      </section>
    </>
  );
};

export default OpenChat;
