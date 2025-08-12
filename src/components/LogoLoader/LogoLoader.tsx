import './logoloader.scss';

const LogoLoader = ({ started, big = false }: { started: boolean; big?: boolean }) => {
  return (
    <>
      <img
        className={`logo-loader ${started ? 'logo-loader_active' : ''} ${
          big ? 'logo-loader_big' : ''
        }`}
        src="/assets/honey-icon.png"
        alt="logo"
      />
    </>
  );
};

export default LogoLoader;
