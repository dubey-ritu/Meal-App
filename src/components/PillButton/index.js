
import { memo } from 'react';
import './style.css'; 

const PillButton = ({ text = "See complete recipe", onClick, faIcon }) => {
  return (
    <button className="pill-button" onClick={onClick}>
      <span>{text}</span>
      {faIcon && <i className={`fa ${faIcon} pill-fa-icon`} aria-hidden="true"></i>}
    </button>
  );
};

export default memo(PillButton);
