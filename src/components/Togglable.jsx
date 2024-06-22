import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      {!visible && (
        <input
          type="button"
          value={props.buttonLabel}
          onClick={toggleVisibility}
        />
      )}
      {visible && (
        <div>
          {props.children}
          <input type="button" value="cancel" onClick={toggleVisibility} />
        </div>
      )}
    </div>
  );
});

export default Togglable;
