const addDefaultValues = (rules, current) => {
    return rules.map(rule => ({
        ...rule,
        defaultValue: current[rule.defaultValue],
    }));
};

export default addDefaultValues;
