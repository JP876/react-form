import React, { useEffect, useState } from 'react';
import { Button, Divider, Step, StepLabel, Stepper } from '@mui/material';
import { Box } from '@mui/system';

import addDefaultValues from './helpers/addDefaultValues';
import UpdateForm from './UpdateForm.jsx';
import BackStepBtn from './BackStepBtn.jsx';

const handleCheckDisable = (stepIndex, steps, inputs, activeStepIndex) => {
    const requiredStep = inputs.filter(
        (i) => i.rules && i.rules.hasOwnProperty('required') && !i.defaultValue
    );

    if (requiredStep.length === 0) return false;
    let index = steps.length;

    const requiredStepIndexes = requiredStep.map((s) =>
        steps.findIndex((label) => label === s.step)
    );

    for (let i of requiredStepIndexes) {
        if (i >= activeStepIndex) {
            index = i;
            break;
        }
    }

    return stepIndex > index;
};

export const StepsForm = ({
    inputs,
    onSubmit,
    btnMsgs = { nextStep: 'Next', prevStep: 'Back', exit: 'Close' },
    exitBtnFunc,
    stepOptions = {
        clickableStep: false,
        stepButtonProps: {},
        stepLabelProps: {},
    },
}) => {
    const { clickableStep, stepButtonProps, stepLabelProps } = stepOptions;

    const [activeStep, setActiveStep] = useState(0);
    const [fields, setFields] = useState([]);
    const [steps, setSteps] = useState([]);
    const [filteredInputs, setFilteredInputs] = useState([]);
    const [finalData, setFinalData] = useState(
        inputs.reduce((o, key) => ({ ...o, [key.name]: '' }), {})
    );

    const handleSubmit = () => onSubmit(finalData);

    const handleNext = (data) => {
        if (data && data?._reactName !== 'onClick') {
            setFinalData((prev) => ({ ...prev, ...data }));
        }

        setActiveStep((prevActiveStep) => {
            return prevActiveStep + 1;
        });
    };

    const handlePrevStep = (data) => {
        if (data && data?._reactName !== 'onClick') {
            setFinalData((prev) => ({ ...prev, ...data }));
        }

        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        const disabled = handleCheckDisable(step, steps, fields, activeStep);

        if (disabled) return null;

        const submitButton = document.getElementById('form-submit-button');
        const customStepNextButton = document.getElementById('step-form-next-btn');

        if (step > activeStep) {
            if (submitButton) {
                submitButton.click();
                setActiveStep(step - 1);
            } else {
                if (customStepNextButton) {
                    customStepNextButton.click();
                }
                setActiveStep(step);
            }
        } else {
            setActiveStep(step);
        }
    };

    // handle steps and inputs for step form
    useEffect(() => {
        const stepsSet = new Set();
        fields.forEach((el) => stepsSet.add(el.step));
        setSteps([...stepsSet]);
        setFilteredInputs(
            [...stepsSet].map((step) => fields.filter((input) => input.step === step))
        );
    }, [fields]);

    // handle updating default values
    useEffect(() => {
        if (inputs) {
            const inputsWithDefault = inputs.map((i) => {
                if (!i.name) return i;
                return { ...i, defaultValue: i.name };
            });
            setFields(addDefaultValues(inputsWithDefault, finalData));
        }
    }, [inputs, finalData]);

    if (!inputs && !onSubmit) {
        return null;
    }

    return (
        <Box className="stepForm-container">
            <Stepper activeStep={activeStep} alternativeLabel sx={{ py: 2 }}>
                {steps?.map?.((label, i) => (
                    <Step key={label}>
                        <StepLabel
                            sx={{
                                cursor: 'pointer',
                                '&.Mui-disabled': {
                                    cursor: handleCheckDisable(
                                        i,
                                        steps,
                                        fields,
                                        activeStep
                                    )
                                        ? 'default'
                                        : 'pointer',
                                },
                            }}
                            {...stepLabelProps}
                            onClick={handleStep(i)}
                        >
                            {clickableStep ? (
                                <Button
                                    size="small"
                                    variant="text"
                                    {...stepButtonProps}
                                    disabled={handleCheckDisable(
                                        i,
                                        steps,
                                        fields,
                                        activeStep
                                    )}
                                >
                                    {label}
                                </Button>
                            ) : (
                                label
                            )}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Divider />
            {filteredInputs.map((input) =>
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
                              key={input[0].name}
                              btnMessage={btnMsgs.nextStep}
                          >
                              {typeof exitBtnFunc === 'function' ? (
                                  <Button
                                      onClick={exitBtnFunc}
                                      color="error"
                                      variant="outlined"
                                  >
                                      {btnMsgs.exit}
                                  </Button>
                              ) : (
                                  <></>
                              )}
                              <BackStepBtn
                                  setFinalData={setFinalData}
                                  activeStep={activeStep}
                                  setActiveStep={setActiveStep}
                                  btnMsg={btnMsgs.prevStep}
                              />
                          </UpdateForm>
                      )
                    : input[0].step === steps[activeStep] &&
                      input.map((i) => {
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
