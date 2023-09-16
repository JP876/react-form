import { Box, styled } from '@mui/system';

const fieldMaxWidth = (columns, layoutGap) => {
    let gapCount = `calc(${columns} - 1)`;
    let totalGapWidth = `calc(${gapCount} * ${layoutGap})`;
    let maxWidth = `calc((100% - ${totalGapWidth}) / ${columns})`;

    return maxWidth;
};

const FormContainer = styled(Box, {
    shouldForwardProp: (prop) =>
        prop !== 'columns' &&
        prop !== 'fieldMinWidth' &&
        prop !== 'layoutGap' &&
        prop !== 'inputStyle',
})(({ theme, columns = '4', fieldMinWidth = '200px', layoutGap = '1rem', inputStyle = {} }) => ({
    '& div.updateForm': {
        display: 'grid',
        gap: layoutGap,
        gridTemplateColumns: `repeat(auto-fill, minmax(max(${fieldMinWidth}, ${fieldMaxWidth(
            columns,
            layoutGap
        )}), 1fr))`,

        '&>div': { ...inputStyle },
    },
}));

export default FormContainer;
