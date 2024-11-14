const NumberInput = ({ value, onChange, ...rest }) => {
  const handleChange = (e) => {
    const convertValue = e.target.valueAsNumber || 0;
    onChange(convertValue);
  };
  return (
    <input
      type="number"
      value={value} // Default to empty string if undefined
      min={12}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default NumberInput;
