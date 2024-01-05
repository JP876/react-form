import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';

import useStepButton from '../../Form/StepsForm/useStepButton.jsx';
import { useCustomStepContext } from '../../Form/StepsForm/CustomStep.jsx';

const AddFile = ({ options: { finalData } }) => {
    const [selectedFile, setSelectedFile] = useState(finalData.selectedFile || []);
    const justMounted = useRef(true);

    const backBtnProps = useStepButton('back', selectedFile);
    const nextBntProps = useStepButton('next', selectedFile);

    const { error, validateStep } = useCustomStepContext();

    const handleChange = ({ target }) =>
        setSelectedFile((prevFiles) => [...prevFiles, ...target.files]);

    const handleDelete = (index) => {
        setSelectedFile((prevFiles) => prevFiles.filter((file, i) => i !== index));
    };

    /* useEffect(() => {
        if (error) {
            setTimeout(() => clearError(), 4_000);
        }
    }, [clearError, error]); */

    useEffect(() => {
        if (!justMounted.current) {
            validateStep(selectedFile);
        }
        justMounted.current = false;
    }, [selectedFile, validateStep]);

    return (
        <>
            <Stack direction="row" justifyContent="center" alignItems="center" sx={{ m: 4 }}>
                <Button variant="outlined" component="label">
                    <Typography variant="body1">Add file</Typography>
                    <input onChange={handleChange} type="file" hidden multiple />
                </Button>
            </Stack>
            <Divider />
            {Array.isArray(selectedFile) && selectedFile.length !== 0 && (
                <List>
                    {selectedFile.map((file, i) => (
                        <ListItem
                            key={`${file?.name}-${i}`}
                            divider
                            secondaryAction={
                                <Button color="error" onClick={() => handleDelete(i)}>
                                    Delete
                                </Button>
                            }
                        >
                            <ListItemText primary={file?.name} />
                        </ListItem>
                    ))}
                </List>
            )}
            {typeof error === 'string' ? (
                <Typography variant="body2" color="error">
                    {error}
                </Typography>
            ) : null}
            <Stack direction="row" justifyContent="space-around" sx={{ m: 2 }}>
                <Button color="error" variant="outlined" {...backBtnProps}>
                    Back
                </Button>

                <Button {...nextBntProps} variant="contained">
                    Next
                </Button>
            </Stack>
        </>
    );
};

export default AddFile;
