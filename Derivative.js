// The "Funct" class has two properties. One is "functExpr" which is the outer function type, and "argument" which
// is the inner function type. E.g. if we have log(tan(sin(x))) then functExpr is log(tan(sin(x))) and argument
// is tan(sin(x))
class Funct
{
	constructor(functExpr)
	{
		let innerFuncStartIndex = functExpr.indexOf('(');

		if (innerFuncStartIndex == -1)
		{
			this.functExpr = functExpr;
			this.argument = null;
		}
		else
		{
			this.functExpr = functExpr.substring(0, innerFuncStartIndex);
			this.argument = new Funct(functExpr.substring(innerFuncStartIndex + 1, functExpr.length - 1));
		}
	}
}
class Derivative
{
    constructor(posFunc)
    {
        this.posFunc = posFunc; 
        this.derivatives = {};
        this.derivatives["cos"] = "-sin?";
        this.derivatives["sin"] = "cos?";
        this.derivatives["sec"] = "sec?tan?";
        this.derivatives["csc"] = "-csc?cot?";
        this.derivatives["tan"] = "sec^2?";
        this.derivatives["cot"] = "-csc^2?";
		this.derivatives["ln"] = "(1 / ?)";
		this.variancesStringArr = [];
    }

	/*
		==============================================================================================================================
		Calculate acts as the main function to determine the individual sub-functions and to determine what kind of derivative
		each sub-function will be. For instance, if sin(tan(x)) is passed into it, all sub-functions will be sin(tan(x)), tan(x)
		and x. Calculate will also determine that we have a chain rule function, and will route the derivative to the right derivative
		rule, namely the chain rule function.
		==============================================================================================================================
	*/
    calculate ()
    {
		let posFunc = this.posFunc;
		let chainRuleDeriv = this.chainRule(posFunc);

		console.log("==================== CONSOLE OUTPUT ==========================")
		console.log("f'(x) = " + chainRuleDeriv);
    }

	/*
		================================================================================================================================================================
		oneDepDeriv takes a string expression and returns the derivative of the outer most function, hence the name "oneDependentDerivative", it only depends
		on the outermost function and doesn't worry about what's inside. It accomplishes this by finding the first instance of an opening parenthesis which symbolizes
		that we've found the inner function, and to have found the inner function would mean we've traversed over the entire outer function. 
		================================================================================================================================================================
	*/
    oneDepDeriv(posFunc)
	{
		if (this.derivatives[posFunc.functExpr] == undefined)
			return "d/dx(" + posFunc.functExpr + ")";

		return this.derivatives[posFunc.functExpr];
	}
	
	/*
		===================================================================================================================================
		add2Stack adds substrings of the positionFunction to the allFunction stack. While there are more sub-functions to be added, 
		continue adding the susbtring of the position/ancestor function from the top of the start stack to the front of the end queue.
		===================================================================================================================================
	*/
    add2Stack(funcStartStack, funcEndQ, functions, positionFunction)
	{
		while ((funcEndQ.length == 0) == false)
			functions.push(positionFunction.substring(funcStartStack.pop(), funcEndQ.shift()));
    }
	
	

	chainRule (posFunc)
	{
		let chainDeriv = "";
		let curr = posFunc;

		while (curr != null)
		{
			let correctVar = this.oneDepDeriv(curr);
			correctVar = this.correctVariance(correctVar, curr);
			chainDeriv += correctVar;
			curr = curr.argument;
		}
		
		return chainDeriv;
	}

	/*
		===========================================================================================================
		productRule takes an array of functions, performs each individual derivative, multiplies them by 
		every other element in the array, puts this result into one term, and then moves onto the next individual
		derivative, and we rinse and repeat until there aren't any more elements left.
		===========================================================================================================
	*/

    productRule(prFunctionsArr)
	{
        let deriv = "";
        let n = prFunctionsArr.length;
		let indDersStringArr = [];
		let variancesStringArr = [];
		
		// this for loop is for storing the variances of each function. This may be better to have in the calculate function? 
		for (let i = 0; i  < n; i++)
		{
			for (let k = 0; k < prFunctionsArr[i].length; k++)
			{
				if (prFunctionsArr[i].charAt(k) == '(')
				{
                    variancesStringArr[i] = prFunctionsArr[i].substring(k + 1, prFunctionsArr[i].indexOf(')'));
                }
			}
		}
		

		// this loop is for storing the derivatives of all the individual functions, however this will have the wrong variance, namely "?", so we
		// must correct this using the correctVariance function
		for(let i = 0; i < prFunctionsArr.length; i++)
            indDersStringArr[i] = this.oneDepDeriv(prFunctionsArr[i]);

		this.correctVariance(indDersStringArr, variancesStringArr, n);

		
		// Add each derivative to a string
		for (let i = 0; i < prFunctionsArr.length; i++)
		{
			deriv += indDersStringArr[i]; 
			for (let j = 0; j < prFunctionsArr.length; j++)
			{
				if (i != j)
				{
					deriv += prFunctionsArr[j];
				}
			}
			
			deriv += " + ";
        }

		deriv += "0";
		
		return deriv;
	}
	
	quotientRule()
	{

	}

	powerRule()
	{

	}
	
	/*
		===============================================================================================================================================================
		correctVariances is used to replace the question mark in the map with the correct variable that the function used to hold. E.g. if sin(5x^2) was passed into
		the "this.derivatives" map, we'd want to take note of the "5x^2" portion. We do this by storing the "5x^2" in the variancesStringArr, and replacing the ? 
		with the corresponding index in the array. You'll also notice that we attach opening and closing parentheses to the variance, and that's because if you notice 
		in "this.derivatives", we omit the parentheses.
		===============================================================================================================================================================
	*/
    correctVariance(expr, posFunc)
	{
		if (posFunc.argument == null)
			return expr;

		let sub = posFunc.argument.functExpr;

		if (expr.search(/\?/) != -1)
			expr = expr.replace(/\?/g, '(' + this.correctVariance(sub, posFunc.argument) + ')');
		else
		{
			return posFunc.functExpr +  "(" + this.correctVariance(sub, posFunc.argument) + ")";
		}

		return expr;
	}
}

function main ()
{
	let positionFunction = "sin(80x^2)";
	let gfNode = new Funct(positionFunction);
	
	console.log("==================== USER INPUT ==========================");
	console.log("f(x) = " + positionFunction);
	
	let d_1 = new Derivative(gfNode);
	d_1.calculate();
}

main();