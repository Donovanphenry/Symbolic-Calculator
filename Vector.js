class Vector
{
    constructor(operands, operation)
    {
        this.operands = operands;
        let ans;

        switch (operation)
        {
            case '*':
                ans = this.dotProduct(operands);
                break;
            case 'x':
                ans = this.crossProduct(operands);
                break;
            case '+':
                ans = this.addition(operands);
                break;
            case '||v||':
                ans = this.magnitude(operands);
                break;
            default:
                console.log('Invalid operation name');
        }

        this.result = ans;
    }

    addition(vecs)
    {
        let result = [];

        for (let j = 0; j < vecs[0].length; j++)
        {
            result[j] = 0;
        }

        console.log('Default add array: [' + result + ']');

        for (let i = 0; i < vecs.length; i++)
        {
            for (let k = 0; k < vecs[i].length; k++)
            {
                result[k] += vecs[i][k];
            }
        }

        console.log('Default add array: [' + result + ']');

        return result;
    }

    dotProduct(vecs)
    {
        if (vecs.length != 2)
        {
            connsole.log('Improper number of vectors for this operation. Returning null')
            return null;
        }
        else if (vecs[0].length != vecs[1].length)
        {
            console.log('Vector 1 does not belong to the same vector space as vector 2');
            return null;
        }

        const vec_1 = vecs[0];
        const vec_2 = vecs[1];
        let ans = 0;

        for (let k = 0; k < vec_1.length; k++)
        {
            ans += vec_1[k] * vec_2[k];
        }

        return ans;
    }

    crossProduct(vecs)
    {
        if (vecs <= 1)
        {
            console.log("Error: Insufficient number of vectors provided. Returning null");
            return null;
        }

        for (let i = 0; i < vecs.length; i++)
        {
            if (vecs[i].length != 3)
            {
                console.log("Error: Vector " + i + " does not belong to the vector space R^3. Returning null");
                return null;
            }
        }

        let result = [];
        let a = vecs[0];
        let b = vecs[1];


        result[0] = a[1] * b[2] - a[2] * b[1];
        result[1] = a[2] * b[0] - a[0] * b[2];
        result[2] = a[0] * b[1] - a[1] * b[0];

        return result;
    }

    magnitude(vecs)
    {
        if (vecs == null)
        {
            console.log('Null vector');
            return null;
        }

        let vec_1 = vecs[0];

        if (vec_1 == null || vec_1.length == 0)
        {
            console.log('Vector has no elements. Returning null');
            return null;
        }

        let inSqrt = 0;

        for (let i = 0; i < vec_1.length; i++)
        {
            inSqrt += vec_1[i] * vec_1[i];
        }

        let result = Math.pow(inSqrt, 1/2);

        return result;
    }
}

function main(vecs, operation)
{
    let ans = new Vector(vecs, operation);

    console.log('Ans: [' + ans.result + ']');
}

const vec_1 = [1, 2, 3];
const vec_2 = [-1, 10, 11];
const vec_3 = [8, 7, 69];
const vec_4 = [-20, 36, 420];
const vec = [vec_1];
const operation = "||v||";

main(vec, operation);