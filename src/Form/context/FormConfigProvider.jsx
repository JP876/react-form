import React from 'react';

const FormConfigState = React.createContext();
const useFormConfigState = () => React.useContext(FormConfigState);

const defaultConfig = {
    date: {
        adapterLocale: '',
    },
};

const FormConfigProvider = ({ config, children }) => {
    const configValue = React.useMemo(() => config, []);

    return <FormConfigState.Provider value={configValue}>{children}</FormConfigState.Provider>;
};

export { FormConfigProvider, useFormConfigState, defaultConfig };
