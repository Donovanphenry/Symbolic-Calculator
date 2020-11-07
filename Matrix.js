
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
            console.error("Error: Matrix do not have equal number of rows. Returning null");
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

    /**
     *
     * @param {*} matrix_1
     * @param {*} matrix_2
     * 
     * Time-complexity analysis: O(m + mn + mnp) = O(m(1 + n(1 + p))) = O(m(n(p))) = O(mnp)
     */
    multiply(matrix_1, matrix_2)
    {
        let m = matrix_1.length;
        let n = matrix_1[0].length;
        let o = matrix_2.length;
        let p = matrix_2[0].length;

        if (n != o)
        {
            console.error('Error: Matrices have invalid sizes for this operation. Returning null');
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

    /**
     * 
     * @param {*} matrix
     * Time complexity analysis: O(n^3)
     * Space complexity analysis: O(1)
     */
    determinant(matrix)
    {
        const m = matrix.length;
        const n = matrix[0].length;

        if (m != n)
        {
            console.error('Error: Non-square matrix');
            return null;
        }

        if (m == 1)
        {
            
            return matrix[[0]];
        }
        else if (m == 2)
        {
            const a11 = matrix[0][0];
            const a12 = matrix[0][1];
            const a21 = matrix[1][0];
            const a22 = matrix[1][1];

            return a11*a22 - a12*a21;
        }

        let cofactorSum = 0;
        for (let k = 0; k < n; k++)
        {
            cofactorSum += matrix[0][k] * this.cofactor(matrix, 0, k);
        }

        return cofactorSum;
    }

    /**
     *
     * @param {*} matrix
     * @param {*} i
     * @param {*} j
     * 
     * Time complexity analysis: O(n^2)
     * Space complexity analysis: O(n^2)
     */
    cofactor(matrix, i, j)
    {
        const oneToIJ = Math.pow(-1, i + j);
        const ijthMinor = this.minor(matrix, i, j);

        return (oneToIJ * ijthMinor);
    }

    /**
     * 
     * @param {*} matrix
     * @param {*} i
     * @param {*} j
     * 
     * Time Complexity Analysis: O(n^2)
     * Space complexity anaylsis: O(n^2)
     */
    minor(matrix, i, j)
    {
        const m = matrix.length;
        const n = matrix[0].length;

        if (m != n)
        {
            console.error('Error: Non-square matrix. Cannot compute minor');
        }
    
        const ij_th_minor = [];
        let rowCount = -1;

        for (let k = 0; k < n; k++)
        {
            if (k != i)
            {
                rowCount++;
                ij_th_minor.push([]);
            }
            
            for (let p = 0; p < n; p++)
            {
                if (k != i && j != p)
                {
                    ij_th_minor[rowCount].push(matrix[k][p]);
                }
            }
        }

        return this.determinant(ij_th_minor);
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
    const m = [[0, 7, 3, 5], [2, 8, 4, 20], [0, 0, 0, 0], [28, 64, 6, 11]];
    const n = [[-11, -4, 3, 18], [2, 1, 0, 14], [1, 6, 5, 2], [3, 2, 0, 10]];
    const p = new Matrix();

    const resultAddition = p.add(m, n);
    const resultMult = p.multiply(m, n);
    const determinant = p.determinant(n);
    const td = p.determinant(m);
    console.log('Should be zero: ' + td);

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
            addedString += "|\n";
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

    console.log("Determinant of matrix: " + determinant);
}

main();