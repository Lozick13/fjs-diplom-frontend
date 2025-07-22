import './time.scss';

interface TimeProps {
  startDate: string;
  endDate: string;
}

const Time: React.FC<TimeProps> = ({ startDate, endDate }) => {
  //format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString();
    const month = date.toLocaleString('ru-RU', { month: 'short' });
    const year = date.getFullYear().toString();
    return { day, month, year };
  };
  const checkInDate = formatDate(startDate);
  const checkOutDate = formatDate(endDate);
  const DateDisplay: React.FC<{ day: string; month: string; year: string }> = ({
    day,
    month,
    year,
  }) => (
    <time className="time__date" dateTime={`${year}-${month}-${day}`}>
      <span className="time__day">{day}</span>
      <span className="time__month">{month}</span>
      <span className="time__year">{year}</span>
    </time>
  );

  return (
    <section className="time">
      <DateDisplay
        day={checkInDate.day}
        month={checkInDate.month}
        year={checkInDate.year}
      />
      <span className="time__separator">до</span>
      <DateDisplay
        day={checkOutDate.day}
        month={checkOutDate.month}
        year={checkOutDate.year}
      />
    </section>
  );
};

export default Time;
