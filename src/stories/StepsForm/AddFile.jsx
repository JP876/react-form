import React, { useEffect, useState } from 'react';
import { Button, Divider, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';

import useStepButton from '../../Form/StepsForm/useStepButton';

const AddFile = ({ options: { finalData, error } }) => {
    const [selectedFile, setSelectedFile] = useState(finalData.selectedFile || []);

    const backBtnProps = useStepButton('back', selectedFile);
    const nextBntProps = useStepButton('next', selectedFile);

    const handleChange = ({ target }) =>
        setSelectedFile((prevFiles) => [...prevFiles, ...target.files]);

    const handleDelete = (index) => {
        setSelectedFile((prevFiles) => prevFiles.filter((file, i) => i !== index));
    };

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
            <Typography variant="body2" color="error">
                {error || ''}
            </Typography>
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
