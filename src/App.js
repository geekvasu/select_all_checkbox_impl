import { useReducer, useState } from "react";
import Checkbox from "./Checkbox";
import { list } from "./list";

function reducer(state, action) {
  switch (action.type) {
    case "settingIndividualState":
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id
            ? { ...item, state: action.payload.state }
            : item
        ),
      };
    // newList.every((item) => item.state === true) ? setAll(true) : "";

    case "setAll":
      return {
        list: state.list.map((item) => {
          return { ...item, state: action.payload.state };
        }),
        overall: action.payload.state,
      };
    case "adjustSelectAll":
      console.log(state.list.every((item) => item.state === true));
      return {
        ...state,
        overall: state.list.every((item) => item.state === true),
      };
    default:
      throw new Error(`Invalid action ${action}`);
  }
}

// const initialState = list.map(({ name }) => name);

function App() {
  const [checkboxesState, dispatch] = useReducer(reducer, {
    overall: false,
    list: [...list],
  });
  // const [all, setAll] = useState(false);

  function handleOnChange(event, id) {
    // console.log(event.target.value);
    dispatch({
      type: "settingIndividualState",
      payload: { id: id, state: event.target.checked },
    });
    dispatch({ type: "adjustSelectAll" });
  }
  function handleSelectAllOnChange() {
    dispatch({ type: "setAll", payload: { state: !checkboxesState.overall } });
    // setAll((current) => !current);
  }

  return (
    <div className="container">
      <div className="top">
        <Checkbox
          label="Select All"
          id="all"
          checked={checkboxesState.overall}
          onChange={handleSelectAllOnChange}
        />
      </div>
      <div className="containerBody">
        {checkboxesState.list.map((item) => (
          <Checkbox
            label={item.name}
            id={item.id}
            key={item.id}
            checked={item?.state ? true : false}
            onChange={handleOnChange}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
