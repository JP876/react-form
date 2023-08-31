import { Button, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

const FileInput = ({ onChange, value }) => {
    return (
        <>
            <Divider sx={{ mx: -2 }} />
            <Button variant="outlined" component="label">
                <Typography variant="body1">Add file</Typography>
                <input
                    onChange={(e) => onChange([...e.target.files])}
                    type="file"
                    hidden
                    multiple
                />
            </Button>
            {value.length !== 0 && (
                <List>
                    {value.map((file, i) => (
                        <ListItem
                            key={`${file?.name}-${i}`}
                            divider
                            secondaryAction={
                                <Button
                                    color="error"
                                    onClick={() =>
                                        onChange(
                                            value.filter((file, index) => i !== index)
                                        )
                                    }
                                >
                                    Delete
                                </Button>
                            }
                        >
                            <ListItemText primary={file?.name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    );
};

export default FileInput;
