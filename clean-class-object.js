function cleanObjectClass(matrix) {
    let cleanedMatrix = {};
    Object.keys(matrix).forEach(item => {
        cleanedMatrix[item] = matrix[item];
    });

    cleanedMatrix.rows = Math.round(cleanedMatrix.rows);
    cleanedMatrix.columns = Math.round(cleanedMatrix.columns);
    delete cleanedMatrix.rootSvg;
    delete cleanedMatrix.colPaddingAdjust;
    delete cleanedMatrix.rowPaddingAdjust;
    delete cleanedMatrix.IS_DESKTOP;
    delete cleanedMatrix.calculated;
    console.log('cleaned object', cleanedMatrix);

    return cleanedMatrix;
}