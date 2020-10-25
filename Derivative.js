// TESTING UPSTREAM

// The "Funct" class has two properties. One is "functExpr" which is the outer function type, and "argument" which
// is the inner function type. E.g. if we have log(tan(sin(x))) then functExpr is log(tan(sin(x))) and argument
// is tan(sin(x))
class Funct
{
	constructor(functExpr)
	{
		let trueArgIndex = functExpr.indexOf('(');
		let trueEndIndex = functExpr.indexOf(')');
		let i = trueArgIndex + 1;
		this.siblings = [];

		if (trueArgIndex == -1)
		{
			functExpr = functExpr.substring(0, trueEndIndex);
			this.siblings = null;
			this.functExpr = functExpr;
			return; 
		}
		else if (trueArgIndex == 0)
		{
			this.functExpr = functExpr.substring(1, functExpr.length);
		}
		else
		{
			this.functExpr = functExpr.substring(0, trueArgIndex);

		}

		let startIndex = [];
		let endIndex = [];
		let parenthStack = [];

		

		startIndex.push(i);

		for (; i < functExpr.length; i++)
		{
			if (functExpr.charAt(i) == '(')
				parenthStack.push('(');
			else if (functExpr.charAt(i) == ')' && parenthStack.length == 1 && i + 1 < functExpr.length)
			{
				startIndex.push(i + 1);
				endIndex.push(i + 1);
			}
			else if (functExpr.charAt(i) == ')')
			{
				parenthStack.pop();
			}
		}

		endIndex.push(functExpr.length);

		while (startIndex.length > 0 && endIndex.length > 0)
		{
			let siblingSubString = functExpr.substring(startIndex.shift(), endIndex.shift());
			
			if (siblingSubString != undefined && siblingSubString != ')')
			{
				this.siblings.push(new Funct(siblingSubString));
			}
		}

		
		let array = [];
		for (let i = 0; i < this.siblings.length; i++)
		{
			array.push(this.siblings[i].functExpr);
		}

		console.log("FunctExpr: " + this.functExpr + " Siblings: [" + array + "]")
		
	}

	derivative ()
	{
		this.derivativeFunc = new Derivative(this);
		return this.derivativeFunc;
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
		let deriv = this.productRule(posFunc.siblings);

		console.log("==================== CONSOLE OUTPUT ==========================")
		console.log("f(x) = " + this.traverseParams(posFunc.siblings[0]));
		console.log("Operation: [d^1/(dt^1)]*f(x) = f'(x)");
		console.log("f'(x) = " + deriv);
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
			return "d/dx(" + posFunc.functExpr + ')';

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
		let temp = "";
		let curr = posFunc;

		temp += this.oneDepDeriv(curr);
		chainDeriv += this.correctVariance(temp, curr);

		let inner = this.productRule(posFunc.siblings);

		if (inner != '')
		{
			chainDeriv += "[" + inner + "]";
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
		if (prFunctionsArr == null || prFunctionsArr == undefined || prFunctionsArr[0].functExpr == undefined)
		{
			return "";
		}

		let deriv = "";

		for (let i = 0; i < prFunctionsArr.length; i++)
		{
			deriv += this.chainRule(prFunctionsArr[i]);

			for (let k = 0; k < prFunctionsArr.length; k++)
			{
				if (k != i)
				{
					deriv += this.traverseParams(prFunctionsArr[k]);
				}
			}

			deriv += " + ";
		}

		deriv = deriv.substring(0, deriv.length - 3);
		return deriv;
	}

	traverseParams(posFunc)
	{
		if (posFunc.siblings == null)
		{
			return posFunc.functExpr;
		}

		let expr = posFunc.functExpr;

		for (let i = 0; i < posFunc.siblings.length; i++)
		{
			if (posFunc.siblings[i].functExpr != "")
				expr += '(' + this.traverseParams(posFunc.siblings[i]) + ')';
		}

		return expr;
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
		if (posFunc.siblings == null)
		{
			return expr;
		}

		let sub = "";			

		for (let i = 0; i < posFunc.siblings.length; i++)
		{
			sub += this.correctVariance(posFunc.siblings[i].functExpr, posFunc.siblings[i]);
		}		

		if (expr.search(/\?/) != -1)
		{
			expr = expr.replace(/\?/g, '(' + sub + ')');
		}
		else
		{
			expr += '(' + sub + ')';
		}

		if (expr.search('-') != -1)
		{
			expr = '(' + expr + ')';
		}

		return expr;
	}
}

function main ()
{
	let positionFunction = "(sin(cos(x)tan(x))";
	let gfNode = new Funct(positionFunction);
	let strDeriv = gfNode.derivative(positionFunction);
	
	/*
	console.log("==================== USER INPUT ==========================");
	console.log("f(x) = " + positionFunction);
	*/
	
	let d_1 = new Derivative(gfNode);
	d_1.calculate();
}

main();