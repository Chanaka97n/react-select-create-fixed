import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
};

const orderOptions = (values) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
};

const App = () => {
  const [value, setValue] = useState(orderOptions([]));
  const [options, setOptions] = useState([]);
  const [keywords] = useState([
    { value: "option1", label: "option 1", isFixed: true },
    { value: "option2", label: "option 2", isFixed: false },
    { value: "option3", label: "option 3", isFixed: false },
  ]);
  const [loading] = useState(false);

  const onChange = (newValue, actionMeta) => {
    let updatedValue = newValue;

    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        updatedValue = options.filter((v) => v.isFixed);
        break;
      default:
        break;
    }
    setValue(orderOptions(updatedValue));
  };
  useEffect(() => {
    if (keywords?.length > 0) {
      setOptions([...keywords]);
      setValue([...keywords]);
    }
  }, [keywords]);

  //In this array return all of values
  console.log("value", value);

  return (
    <CreatableSelect
      isMulti
      onChange={onChange}
      options={options}
      styles={styles}
      isClearable={value.some((v) => !v.isFixed)}
      value={value}
      isLoading={loading}
    />
  );
};

export default App;
