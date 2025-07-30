import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FormSteps from './FormSteps';
import PersonalInfoForm from './PersonalInfoForm';
import NavigationButtons from './NavigationButtons';
import HeaderWithAction from '../HeaderWithAction';
import EmployeeAddressGoogleMapView from '../Map';
import { ToastContainer, toast } from 'react-toastify';

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
};

const EmployeeForm = ({ mode = 'create' }) => {
  const { state } = useLocation();
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState('personalInfo');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(mode !== 'create');

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
          department: 1,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Employee ${mode === 'create' ? 'created' : 'updated'} (mock)`);
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
                />
              ) : (
                <>
                  <EmployeeAddressGoogleMapView 
                    formData={formData} 
                    setFormData={setFormData}
                    setErrors={setErrors}
                    isReadOnly={false}
                  />
                </>
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
