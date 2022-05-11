const createDefaultValues = editFields => {
    const obj = {};
    editFields.map(field => (obj[field.name] = field.defaultValue));
    return obj;
};

export default createDefaultValues;
