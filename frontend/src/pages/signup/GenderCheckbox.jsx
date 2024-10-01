import PropTypes from 'prop-types';

const GenderCheckbox = ({ handleCheckBox, selectedValue }) => {
  return (
    <div className='flex'>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer`}>
          <span className='label-text'>Male</span>
          <input
            type='checkbox'
            className='checkbox border-slate-900'
            checked={selectedValue === 'male'}
            onChange={() => handleCheckBox('male')}
          />
        </label>
      </div>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer`}>
          <span className='label-text'>Female</span>
          <input
            type='checkbox'
            className='checkbox border-slate-900'
            checked={selectedValue === 'female'}
            onChange={() => handleCheckBox('female')}
          />
        </label>
      </div>
    </div>
  );
};

// Adding PropTypes validation
GenderCheckbox.propTypes = {
  handleCheckBox: PropTypes.func.isRequired,  // Ensure handleCheckBox is a function
  selectedValue: PropTypes.string.isRequired  // Ensure selectedValue is a string
};

export default GenderCheckbox;
