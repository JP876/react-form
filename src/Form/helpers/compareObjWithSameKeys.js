const compareObjWithSameKeys = (obj1, obj2) => {
    if (obj1 && obj2) {
        const objKeys = Object.keys(obj1);
        const valuesObj1 = Object.values(obj1);
        const valuesObj2 = Object.values(obj2);
        let result = {};

        let filteredValues = valuesObj1.filter(
            (el, i) => el?.valueOf() !== valuesObj2[i]?.valueOf()
        );
        if (filteredValues.length === 0) return false;

        let indexes = filteredValues.map(el => valuesObj1.findIndex(val => val === el));
        indexes.forEach(index => (result[objKeys[index]] = valuesObj1[index]));

        return result;
    }
    return false;
};

export default compareObjWithSameKeys;
