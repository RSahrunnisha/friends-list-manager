import "./styles.scss";

const Header = ({ title }) => {
  return (
    <header className="header">
      <h3 className="title">{title}</h3>
    </header>
  );
};

export default Header;
