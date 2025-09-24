import React, { useState } from 'react';
import statesList from '../../data/statesList';

const Create = () => {
  const [formData, setFormData] = useState({
    slno: '',
    registrationNo: '',
    name: '',
    gender: '',
    fatherName: '',
    dob: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    nation: '',
    pincode: '',
    campus: '',
    college: '',
    degree: '',
    course: '',
    batch: '',
    branch: '',
    className: '',
    section: '',
    aadhar: '',
    hostler: '',
  });

  // Object to hold validation errors
  const [errors, setErrors] = useState({});

  // Validate function for required fields
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (!formData.fatherName.trim()) newErrors.fatherName = 'Father Name is required.';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required.';
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile is required.';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile must be 10 digits.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = 'Invalid email address.';
    }
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.state) newErrors.state = 'State is required.';
    if (!formData.nation.trim()) newErrors.nation = 'Nation is required.';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required.';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits.';
    }
    if (!formData.campus.trim()) newErrors.campus = 'Campus is required.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.college.trim()) newErrors.college = 'College is required.';
    if (!formData.degree.trim()) newErrors.degree = 'Degree is required.';
    if (!formData.course.trim()) newErrors.course = 'Course is required.';
    if (!formData.batch) newErrors.batch = 'Batch is required.';
    if (!formData.branch.trim()) newErrors.branch = 'Branch is required.';
    if (!formData.className.trim()) newErrors.className = 'Class is required.';
    if (!formData.section.trim()) newErrors.section = 'Section is required.';
    if (!formData.aadhar.trim()) {
      newErrors.aadhar = 'Aadhar is required.';
    } else if (!/^\d{12,16}$/.test(formData.aadhar)) {
      newErrors.aadhar = 'Aadhar must be between 12 and 16 digits.';
    }
    if (!formData.hostler) newErrors.hostler = 'Hostler is required.';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined })); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // No errors: proceed with form submission
    console.log(formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Student Registration Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Name', name: 'name', maxlength: 100, required: true },
          { label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
          { label: 'Father Name', name: 'fatherName', maxlength: 100, required: true },
          { label: 'DOB', name: 'dob', type: 'date', required: true },
          { label: 'Mobile', name: 'mobile', maxlength: 10, type: 'text', required: true },
          { label: 'Email ID', name: 'email', type: 'email', maxlength: 100, required: true },
          { label: 'Address', name: 'address', maxlength: 500, required: true },
          { label: 'City', name: 'city', maxlength: 50, required: true },
          { label: 'State', name: 'state', type: 'select', options: statesList, required: true },
          { label: 'Nation', name: 'nation', maxlength: 100, required: true },
          { label: 'Pincode', name: 'pincode', maxlength: 6, required: true },
          { label: 'Campus', name: 'campus', maxlength: 250, required: true },
          { label: 'College', name: 'college', maxlength: 250, required: true },
          { label: 'Degree', name: 'degree', maxlength: 250, required: true },
          { label: 'Course', name: 'course', maxlength: 250, required: true },
          { label: 'Batch', name: 'batch', type: 'select', options: ['2025-2026', '2026-2027', '2028-2029', '2029-2030'], required: true },
          { label: 'Branch', name: 'branch', maxlength: 150, required: true },
          { label: 'Class', name: 'className', maxlength: 150, required: true },
          { label: 'Section', name: 'section', maxlength: 50, required: true },
          { label: 'Aadhar', name: 'aadhar', maxlength: 16, type: 'text', required: true },
          { label: 'Hostler', name: 'hostler', type: 'select', options: ['Yes', 'No'], required: true },
        ].map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label} {field.required ? <span className="text-red-500">*</span> : null}
            </label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded ${
                  errors[field.name] ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select</option>
                {field.options && field.options.map((option, i) => (
                  <option
                    key={i}
                    value={typeof option === 'object' ? option.value : option}
                  >
                    {typeof option === 'object' ? option.label : option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded ${
                  errors[field.name] ? 'border-red-500' : 'border-gray-300'
                }`}
                maxLength={field.maxlength || undefined}
              />
            )}
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
