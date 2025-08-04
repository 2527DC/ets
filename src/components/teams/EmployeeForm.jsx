import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FormSteps from './FormSteps';
import PersonalInfoForm from './PersonalInfoForm';
import NavigationButtons from './NavigationButtons';
import HeaderWithAction from '../HeaderWithAction';
import EmployeeAddressGoogleMapView from '../Map';
import { ToastContainer, toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';

const initialFormData = {
  employeeName: '',
  employee_code: '',
  emailId: '',
  gender: '',
  mobileNumber: '',
  alternate_mobile_number: '',
  office: '',
  specialNeed: 'None',
  dateRange: {
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  },
  address: '',
  landmark: '',
  latitude: '',
  longitude: '',
  distance_from_company: '',
  department: ''
};

const EmployeeForm = ({ mode = 'create' }) => {
  const { state } = useLocation();
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState('personalInfo');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(mode !== 'create');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRangeSelection, setDateRangeSelection] = useState([
    {
      startDate: parseISO(formData.dateRange?.startDate || new Date().toISOString()),
      endDate: parseISO(formData.dateRange?.endDate || new Date().toISOString()),
      key: 'selection',
    },
  ]);


  const [backendErrors, setBackendErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Mock function to simulate API call
  const submitFormToBackend = async (formData) => {
    try {
      setIsSubmitting(true);
      // Replace this with your actual API call
      const response = await mockApiCall(formData);
      
      if (response.success) {
        toast.success(`Employee ${mode === 'create' ? 'created' : 'updated'} successfully`);
        // Optionally reset form or redirect on success
        // setFormData(initialFormData);
      } else {
        // Handle backend validation errors
        setBackendErrors(response.errors || {});
        toast.error('Please fix the errors in the form');
      }
    } catch (error) {
      toast.error('An error occurred while submitting the form');
      } finally {
      setIsSubmitting(false);
      setSubmitAttempted(true);
    }
  };
  
  const mockApiCall = (data) => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation - in real app, this would come from your backend
        const errors = {};
        
        if (!data.employeeName) {
          errors.employeeName = 'Employee name is required';
        }
        if (!data.emailId || !/^\S+@\S+\.\S+$/.test(data.emailId)) {
          errors.emailId = 'Valid email is required';
        }
        // Add other validations as needed
        
        if (Object.keys(errors).length > 0) {
          resolve({ success: false, errors });
        } else {
          resolve({ success: true });
        }
      }, 1000);
    });
  };


  const handleDateSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setDateRangeSelection([ranges.selection]);

    setFormData((prev) => ({
      ...prev,
      dateRange: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      },
    }));
  };

  const displayDateRange = () => {
    const { startDate, endDate } = formData.dateRange || {};
    if (startDate && endDate) {
      return `${format(parseISO(startDate), 'dd MMM yyyy')} - ${format(parseISO(endDate), 'dd MMM yyyy')}`;
    }
    return '';
  };

  useEffect(() => {
    if (mode !== 'create') {
      const employee = state?.employee;
      if (employee) {
        const mappedData = {
          ...initialFormData,
          employeeName: employee.username || employee.employeeName || '',
          employee_code: employee.employee_code || '',
          emailId: employee.email || employee.emailId || '',
          gender: employee.gender || '',
          mobileNumber: employee.mobile_number || employee.mobileNumber || '',
          alternate_mobile_number: employee.alternate_mobile_number || '',
          office: employee.office || '',
          specialNeed: employee.specialNeed || 'None',
          department: employee.department || '',
          dateRange: employee.dateRange || initialFormData.dateRange,
          address: employee.address || '',
          landmark: employee.landmark || '',
          latitude: employee.latitude || '',
          longitude: employee.longitude || '',
          distance_from_company: employee.distance_from_company || '',
        };
        setFormData(mappedData);
      }
      setIsLoading(false);
    }
  }, [mode, state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleNext = () => {
    setCurrentStep('address');
    if (!completedSteps.includes('personalInfo')) {
      setCompletedSteps((prev) => [...prev, 'personalInfo']);
    }
  };

  const handleBack = () => {
    setCurrentStep('personalInfo');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    // First validate locally
    const localErrors = validateForm(formData);
    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      toast.error('Please fix the form errors');
      return;
    }
    
    // If local validation passes, submit to backend
    await submitFormToBackend(formData);
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.employeeName) errors.employeeName = 'Employee name is required';
    if (!data.employee_code) errors.employee_code = 'Employee ID is required';
    if (!data.emailId) errors.emailId = 'Email is required';
    if (!data.gender) errors.gender = 'Gender is required';
    if (!data.department) errors.department = 'Department is required';
    return errors;
  };

  // Combine local and backend errors
  const allErrors = {
    ...errors,
    ...backendErrors
  };


  const isFirstStep = currentStep === 'personalInfo';
  const isLastStep = currentStep === 'address';

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4">Loading employee data...</span>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <HeaderWithAction 
        title={mode === 'create' ? 'NEW EMPLOYEE' : mode === 'edit' ? 'EDIT EMPLOYEE' : 'EMPLOYEE DETAILS'} 
        showBackButton={true} 
      />
      <div className='p-2 m-3 bg-white rounded-xl'>
        {mode === 'view' ? (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              <PersonalInfoForm
                formData={formData}
                onChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
                errors={errors}
                isReadOnly={true}
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                dateRangeSelection={dateRangeSelection}
                handleDateSelect={handleDateSelect}
                displayDateRange={displayDateRange}
              />
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Address Information</h2>
              <EmployeeAddressGoogleMapView 
                formData={formData} 
                setFormData={setFormData}
                setErrors={setErrors}
                isReadOnly={true}
              />
            </div>
            <NavigationButtons
              currentStep="complete"
              onSubmit={handleSubmit}
              isLastStep={true}
              mode={mode}
            />
          </>
        ) : (
          <>
            <FormSteps currentStep={currentStep} completedSteps={completedSteps} />
            <div className="mt-6 m-3">
              {currentStep === 'personalInfo' ? (
                <PersonalInfoForm
                  formData={formData}
                  onChange={handleInputChange}
                  onCheckboxChange={handleCheckboxChange}
                  errors={errors}
                  isReadOnly={false}
                  showDatePicker={showDatePicker}
                  setShowDatePicker={setShowDatePicker}
                  dateRangeSelection={dateRangeSelection}
                  handleDateSelect={handleDateSelect}
                  displayDateRange={displayDateRange}
                />
              ) : (
                <EmployeeAddressGoogleMapView 
                  formData={formData} 
                  setFormData={setFormData}
                  setErrors={setErrors}
                  isReadOnly={false}
                />
              )}
            </div>
            <NavigationButtons
              currentStep={currentStep}
              onBack={handleBack}
              onNext={handleNext}
              onSubmit={handleSubmit}
              isLastStep={isLastStep}
              isFirstStep={isFirstStep}
              isSubmitting={isSubmitting}
              mode={mode}
            />
          </>
        )}
      </div>
    </>
  );
};

export default EmployeeForm;