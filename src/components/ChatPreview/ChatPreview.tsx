import './chatpreview.scss';

const ChatPreview = ({
  click,
  id,
  date,
  active,
}: {
  click: () => void;
  id: string;
  date: string;
  active?: boolean;
}) => {
  return (
    <article
      onClick={click}
      className={`chat-preview${active ? ' chat-preview_active' : ''}`}
    >
      <img className="chat-preview__img" src={'./assets/support.png'} alt="Аватарка" />
      <div className="chat-preview__info">
        <h3 className="chat-preview__name">Обращение:</h3>
        <p className="chat-preview__id">{id}</p>
        <p className="chat-preview__data">{date}</p>
      </div>
    </article>
  );
};

export default ChatPreview;
