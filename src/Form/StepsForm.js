import React, { useEffect, useMemo, useState } from 'react';
import { Divider, Step, StepLabel, Stepper } from '@mui/material';
import { Box } from '@mui/system';
import addDefaultValues from './helpers/addDefaultValues';
import UpdateForm from './UpdateForm';
import BackStepBtn from './BackStepBtn';

const StepsForm = ({ inputs, onSubmit, children }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [fields, setFields] = useState([]);
    const [steps, setSteps] = useState([]);
    const [filteredInputs, setFilteredInputs] = useState([]);
    const [defaultValues, setDefaultValues] = useState({});
    const [finalData, setFinalData] = useState({});

    const handleSubmit = () => {
        onSubmit(finalData);
    };

    const handleNext = data => {
        if (data && data?._reactName !== 'onClick') {
            setFinalData(prev => ({ ...prev, ...data }));
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handlePrevStep = data => {
        if (data && data?._reactName !== 'onClick') {
            setFinalData(prev => ({ ...prev, ...data }));
        }
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const childrenMemo = useMemo(() => {
        return children ? (Array.isArray(children) ? children : [children]) : [];
    }, [children]);

    useEffect(() => {
        const obj = {};
        inputs.map(input => {
            return input.name && (obj[input.name] = '');
        });
        setFinalData(obj);
    }, [inputs]);

    useEffect(() => {
        const inputsWithDefault = inputs.map(i => {
            if (!i.name) return i;
            return { ...i, defaultValue: i.name };
        });
        setFields(addDefaultValues(inputsWithDefault, finalData));
    }, [inputs, finalData]);

    useEffect(() => {
        const stepsSet = new Set();
        fields.forEach(el => stepsSet.add(el.step));
        setSteps([...stepsSet]);
    }, [fields]);

    useEffect(() => {
        setFilteredInputs(steps.map(step => fields.filter(input => input.step === step)));
    }, [steps, fields]);

    useEffect(() => {
        const obj = {};
        if (filteredInputs.length !== 0 && activeStep !== steps.length - 1) {
            filteredInputs[activeStep].map(input => {
                return input?.name && (obj[input.name] = finalData[input.name]);
            });
        }
        setDefaultValues(obj);
    }, [activeStep, filteredInputs, finalData, steps]);

    return (
        <Box>
            <Stepper
                style={{ padding: '1rem 0' }}
                activeStep={activeStep}
                alternativeLabel
            >
                {steps?.map?.(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Divider />
            {filteredInputs.map(input =>
                !input[0].Comp
                    ? input[0].step === steps[activeStep] &&
                      Object.keys(input).length !== 0 && (
                          <UpdateForm
                              inputs={input}
                              onSubmit={
                                  activeStep === steps.length - 1
                                      ? handleSubmit
                                      : handleNext
                              }
                              defaultValues={defaultValues}
                              key={input[0].name}
                              btnMessage='Next'
                          >
                              <BackStepBtn
                                  setFinalData={setFinalData}
                                  activeStep={activeStep}
                                  setActiveStep={setActiveStep}
                              />
                          </UpdateForm>
                      )
                    : input[0].step === steps[activeStep] &&
                      input.map(i => {
                          const { Comp, step } = i;

                          return (
                              <Comp
                                  key={step}
                                  options={{
                                      finalData,
                                      handleSubmit,
                                      handlePrevStep,
                                      handleNext,
                                  }}
                              />
                          );
                      })
            )}
        </Box>
    );
};

export default StepsForm;

/* children &&
    React.Children.map(
        childrenMemo.filter(c => c.type === input[0].Comp),
        child =>
            React.cloneElement(child, {
                options: {
                    finalData,
                    handleSubmit,
                    handlePrevStep,
                    handleNext,
                },
            })
    ) */
