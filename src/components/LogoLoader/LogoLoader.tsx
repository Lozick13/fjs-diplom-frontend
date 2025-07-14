import './logoloader.scss';

const LogoLoader = ({ started }: { started: boolean }) => {
  return (
    <>
      <img
        className={`logo-loader ${started ? 'logo-loader_active' : ''}`}
        src="/assets/honey-icon.png"
        alt="logo"
      />
    </>
  );
};

export default LogoLoader;
