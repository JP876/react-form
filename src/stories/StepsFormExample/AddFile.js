import React, { useState } from 'react';
import { Button, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';

const AddFile = ({ options: { handlePrevStep, handleNext, finalData } }) => {
    const [selectedFile, setSelectedFile] = useState(finalData.selectedFile || []);

    const handleChange = ({ target }) =>
        setSelectedFile(prevFiles => [...prevFiles, ...target.files]);

    const handleDelete = index => {
        setSelectedFile(prevFiles => prevFiles.filter((file, i) => i !== index));
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                <Button variant='outlined' component='label'>
                    <Typography variant='body1'>Add file</Typography>
                    <input onChange={handleChange} type='file' hidden multiple />
                </Button>
            </div>
            <Divider />
            {selectedFile.length !== 0 && (
                <List>
                    {selectedFile.map((file, i) => (
                        <ListItem
                            key={`${file?.name}-${i}`}
                            divider
                            secondaryAction={
                                <Button color='error' onClick={() => handleDelete(i)}>
                                    Delete
                                </Button>
                            }
                        >
                            <ListItemText primary={file?.name} />
                        </ListItem>
                    ))}
                </List>
            )}
            <div
                style={{
                    margin: '1rem',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <Button
                    color='error'
                    onClick={() => handlePrevStep({ selectedFile })}
                    variant='outlined'
                >
                    Back
                </Button>
                <Button onClick={() => handleNext({ selectedFile })} variant='contained'>
                    Next
                </Button>
            </div>
        </>
    );
};

export default AddFile;
