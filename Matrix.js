
class Matrix
{
    constructor()
    {

    }

    add(matrix_1, matrix_2)
    {
        let m_1 = matrix_1.length;
        let m_2 = matrix_2.length;
        let addedMatrix = [];

        if (m_1 != m_2)
        {
            console.log("Error: Matrix do not have equal number of rows. Returning null");
            return null;
        }

        for (let i = 0; i < m_1; i++)
        {
            addedMatrix.push([]);
        }

        for (let j = 0; j < m_1; j++)
        {
            for (let k = 0; k < matrix_1[0].length; k++)
            {
                addedMatrix[j][k] = matrix_1[j][k] + matrix_2[j][k];
            }
        }

        return addedMatrix;
    }

    multiply(matrix_1, matrix_2)
    {
        let m = matrix_1.length;
        let n = matrix_1[0].length;
        let o = matrix_2.length;
        let p = matrix_2[0].length;

        if (n != o)
        {
            console.log('Error: Matrices have invalid sizes for this operation. Returning null');
            return null;
        }

        let multipMatrix = [];

        for (let l = 0; l < m; l++)
        {
            multipMatrix.push([]);
        }

        for (let i = 0; i < m; i++)
        {
            for (let j = 0; j < n; j++)
            {
                let ij_th = 0;

                for (let k = 0; k < p; k++)
                {
                    ij_th += matrix_1[i][k] * matrix_2[k][j];
                }

                multipMatrix[i][j] = ij_th;
            }
        }

        return multipMatrix;
    }

    determinant(matrix)
    {

    }

    jacobian(vec)
    {

    }

    eigenDecomposition(matrix)
    {

    }

    invert(matrix)
    {
        
    }
}

function main()
{
    let m = [[0, 7, 3], [2, 8, 4]];
    let n = [[-11, -4, 3], [2, 1, 0], [1, 6, 5]];
    let p = new Matrix();

    let resultAddition = p.add(m, n);
    let resultMult = p.multiply(m, n);

    console.log("Addition of matrices:");

    let addedString = "\n";

    if (resultAddition != null)
    {
        for (let i = 0; i < resultAddition.length; i++)
        {
            addedString += "|\t";
            for (let j = 0; j < resultAddition[0].length; j++)
            {
                addedString += resultAddition[i][j] + "\t";
            }
            addedString += "\t|\n";
        }
    
        console.log(addedString);
    }
    


    console.log("\nMultiplication of matrices:");

    let multipliedString = "\n";

    if (resultMult != null)
    {
        for (let i = 0; i < resultMult.length; i++)
        {
            multipliedString += "|\t";
            for (let j = 0; j < resultMult[0].length; j++)
            {
                multipliedString += resultMult[i][j] + "\t";
            }
            multipliedString += "\t|\n";
        }
    
        console.log(multipliedString);
    }
    
}

main();