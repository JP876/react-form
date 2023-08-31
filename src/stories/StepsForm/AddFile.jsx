import React, { useState } from 'react';
import {
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';

const AddFile = ({ options: { handlePrevStep, handleNext, finalData } }) => {
    const [selectedFile, setSelectedFile] = useState(finalData.selectedFile || []);

    const handleChange = ({ target }) =>
        setSelectedFile((prevFiles) => [...prevFiles, ...target.files]);

    const handleDelete = (index) => {
        setSelectedFile((prevFiles) => prevFiles.filter((file, i) => i !== index));
    };

    return (
        <>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ m: 4 }}
            >
                <Button variant="outlined" component="label">
                    <Typography variant="body1">Add file</Typography>
                    <input onChange={handleChange} type="file" hidden multiple />
                </Button>
            </Stack>
            <Divider />
            {selectedFile.length !== 0 && (
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
            <Stack direction="row" justifyContent="space-around" sx={{ m: 2 }}>
                <Button
                    color="error"
                    onClick={() => handlePrevStep({ selectedFile })}
                    variant="outlined"
                >
                    Back
                </Button>
                <Button
                    //disabled={selectedFile.length === 0}
                    id="step-form-next-btn"
                    onClick={() => handleNext({ selectedFile })}
                    variant="contained"
                >
                    Next
                </Button>
            </Stack>
        </>
    );
};

export default AddFile;
