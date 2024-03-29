import { useCallback, useEffect, useMemo, useState } from 'react';

import { useStepsFormState } from '../context/StepsFormProvider.jsx';

const useHandleCheckDisable = () => {
    const { fields, steps, activeStep, finalData } = useStepsFormState();

    const [formValues, setFormValues] = useState({});

    const requiredStep = useMemo(() => {
        return fields.filter((i) => {
            let hasRequired = i.rules && i.rules.hasOwnProperty('required');
            const formData = { ...finalData, ...formValues };

            if (i?.rules?.hasOwnProperty('validate') && Object.keys(formData).includes(i?.name)) {
                const validateRes = i.rules.validate(formData[i?.name]);
                if (typeof validateRes === 'boolean' && validateRes) {
                    return false;
                }
                return true;
            }

            return hasRequired && !formData[i?.name];
        });
    }, [fields, formValues, finalData]);

    useEffect(() => {
        const handleUpdateFormData = (e) => {
            setFormValues(e.detail.data);
        };

        document.addEventListener('get-single-step-form-data', handleUpdateFormData);
        return () => {
            document.removeEventListener('get-single-step-form-data', handleUpdateFormData);
        };
    }, []);

    return useCallback(
        (stepIndex) => {
            if (requiredStep.length === 0) return false;
            let index = steps.length;

            const requiredStepIndexes = requiredStep.map((s) =>
                steps.findIndex((label) => label === s.step)
            );

            for (let i of requiredStepIndexes) {
                if (i >= activeStep) {
                    index = i;
                    break;
                }
            }

            return stepIndex > index;
        },
        [activeStep, requiredStep, steps]
    );
};

export default useHandleCheckDisable;
