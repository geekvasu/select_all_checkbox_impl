import { useState } from "react";

function Checkbox({ label, id, checked, onChange }) {
  //   const [state, setState] = useState(false);

  return (
    <div className="simple-checkbox">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e, id)}
        value={checked}
      />
      <label htmlFor={id}>
        <strong>{label}</strong>
      </label>
    </div>
  );
}

export default Checkbox;
