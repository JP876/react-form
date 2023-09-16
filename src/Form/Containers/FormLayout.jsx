import { Box, styled } from '@mui/system';

const splitIntoChunks = (arr, chunkSize) => {
    if (!Array.isArray(arr) || !chunkSize) {
        return null;
    }

    const res = [];
    while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
    }

    return res;
};

const multipleName = (name, inputWidth, rightGap, leftGap) => {
    if (!name || !inputWidth) {
        return null;
    }

    let array = [];

    for (let i = 0; i < inputWidth; ) array[i++] = name;

    if (rightGap) {
        for (let i = 0; i < rightGap; i++) array.push('.');
    }
    if (leftGap) {
        for (let i = 0; i < leftGap; i++) array.unshift('.');
    }

    return array.join(' ');
};

const handleAreas = (inputs, columns) => {
    if (!Array.isArray(inputs) || !columns) {
        return null;
    }

    const inputArrName = inputs.map(({ name, layout }) => {
        const { fieldWidth, rightGap, leftGap } = layout;
        return multipleName(name, fieldWidth, rightGap, leftGap);
    });

    const nameArr = inputArrName.join(' ').split(' ');
    const areaArr = splitIntoChunks(nameArr, columns);
    const rowArr = areaArr.map((row) => row.join(' '));

    let gridArea = '';

    for (let row of rowArr) {
        gridArea = gridArea + `'${row}'`;
    }

    return gridArea;
};

const responsiveGridArea = (inputs) => {
    if (!Array.isArray(inputs)) {
        return null;
    }

    let gridArea = '';

    for (let row of inputs) {
        gridArea = gridArea + `'${row.name}'`;
    }

    return gridArea;
};

const FormLayout = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'columns' && prop !== 'layoutGap' && prop !== 'inputs',
})(({ theme, layoutGap = '1rem', inputs = [], columns = '2' }) => ({
    padding: '.4rem 0',

    '& div.updateForm': {
        display: 'grid',
        gap: layoutGap,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateAreas: handleAreas(inputs, columns),

        '&>div': inputs.map(({ name }, i) => ({
            [`&:nth-of-type(${i + 1})`]: {
                gridArea: name,
            },
        })),

        '@media (max-width: 50em)': {
            gridTemplateColumns: '1fr',
            gridTemplateAreas: responsiveGridArea(inputs),
        },
    },
}));

export default FormLayout;
