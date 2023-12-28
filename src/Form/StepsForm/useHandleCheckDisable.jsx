import { useCallback, useMemo } from 'react';

import { useStepsFormState } from '../context/StepsFormProvider';

const useHandleCheckDisable = () => {
    const { values, fields, steps, activeStep } = useStepsFormState();

    const requiredStep = useMemo(() => {
        return fields.filter((i) => {
            let hasRequired = i.rules && i.rules.hasOwnProperty('required');

            if (i?.rules?.hasOwnProperty('validate') && Object.keys(values).includes(i?.name)) {
                const validateRes = i.rules.validate(values[i?.name]);
                if (typeof validateRes === 'boolean' && validateRes) {
                    return false;
                }
                hasRequired = true;
            }

            return hasRequired && !i.defaultValue;
        });
    }, [fields, values]);

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
