import "./button.css";

const Button = ({ text, onClick }: { text: string; onClick?: () => void }) => {
  return (
    <button className="simple-btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
