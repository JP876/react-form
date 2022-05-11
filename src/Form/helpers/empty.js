const empty = object => {
    Object.keys(object).forEach(k => {
        if (object[k] && typeof object[k] === 'object' && !(object[k] instanceof Date)) {
            return empty(object[k]);
        }

        object[k] = null;
    });

    return object;
};

export default empty;
