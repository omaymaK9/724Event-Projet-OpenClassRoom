
import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
  EMAIL: 3, 
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder }) => {
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          required 
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = <textarea name={name} data-testid="field-testid" placeholder={placeholder} required />;
      break;
    case FIELD_TYPES.EMAIL:
      component = (
        <input
          type="email"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          pattern="^(http(s){0,1}:\/\/.){0,1}[\-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$"
          required
        />
      );
      break;
    default:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          required
        />
      );
  }
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
    </div>
  );
};


Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};
 Field.defaultProps = {
   label: "",
   placeholder: "",
   type: FIELD_TYPES.INPUT_TEXT,
   name: "field-name",
 }

export default Field;
