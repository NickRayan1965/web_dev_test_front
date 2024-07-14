import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
export default function RedirectLoginRegister({
  redirectTo,
  message,
  linkMessage,
}) {
  const navigate = useNavigate();
  return (
    <div className="redirect-login-register">
      <span>{message}</span>
      <a onClick={() => navigate(redirectTo)} >
        {linkMessage}
      </a>
    </div>
  );
}

RedirectLoginRegister.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  linkMessage: PropTypes.string.isRequired,
};
