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

        let funcSub = "";
		let allFuncStack = [];
		let funcStartStack = [];
		let funcEndQ = [];
		let prFunctionsArr = [];
		let allFunctionsDerivArr = [];
        let start = 0;
        let end = 0;

        funcStartStack.push(0);

		// ====================================================================================================================================================
        // Iterate through each character in the for loop. If we've found an opening parenthesis, that'll mean we've found a new inner function,
        // so we want to take note of that index and add it to the startStack, as that is the start of a new function. Same ideology with when we 
        // find a closing parenthesis. Once we reach this closing parentheses, there are two things to add to the allFuncStack. We need to add
        // the outer function (e.g. sin( f(x) ) ) and the inner function ( f(x) ). To achieve this we add the current index i to the funcEndQ
        // and the (i + 1) index. We do this because of how the substring function works. String.substring(startIndex, endIndex) goes from the startIndex,
        // to the endIndex - 1, so in order to add the current substring to the stack, we need to go from the top of the funcStartStack to the current index
        // i. After this if statement ends, we'll have added the inner and outer functions to the allFuncStack and we'll have added the outer function to
		// the prFunctionsArr array. 
		// ====================================================================================================================================================
        for (let i = 0; i < this.posFunc.length; i++)
		{
			if (this.posFunc.charAt(i) == '(')
				funcStartStack.push(i + 1);
			else if (this.posFunc.charAt(i) == ')')
			{	
				end = i;
				funcEndQ.push(end);
				
				if (i + 1 < this.posFunc.length && funcStartStack.length == funcEndQ.length + 1)
				{	
					funcEndQ.push(i + 1);
                    this.add2Stack(funcStartStack, funcEndQ, allFuncStack, this.posFunc);
					funcStartStack.push(i + 1);
                    prFunctionsArr.push(allFuncStack[allFuncStack.length - 1]);
				}
			}
			
			// if (funcEndQ.length == 0 && funcStartStack.length == 0 && i < 1)
			// {
				
			// }
        }
        
        //We need to add the last character in the string to catch the entire outer function
        funcEndQ.push(this.posFunc.length);
   
        
        // While there are more substrings. we add them to the allFunctions stack. This is really just to catch the outer function
		while ( (funcStartStack.length == 0) == false && (funcEndQ.length == 0) == false)
		{
			start = funcStartStack.pop();
			end = funcEndQ.shift();
			funcSub = this.posFunc.substring(start, end);
			
			allFuncStack.push(funcSub);
		}
        
        // Push the outer most function that we just got
        prFunctionsArr.push(allFuncStack[allFuncStack.length - 1]);
        
        // Low-key forget why I had this, looking at it rn it doesn't seem necessary, but I'm gonna leave it for now.
		for (let element in allFuncStack)
			allFunctionsDerivArr.push(element);
		
        
        // This ofcourse only returns the proper derivative if the function is a product rule function
		let finalDeriv = this.productRule(prFunctionsArr);
		//let otherDeriv = this.productRule(allFunctionsDerivArr);
		//String chainRuleDerv = chainRule (crFunctions);
		
		console.log("\n========================== DEBUGGING PURPOSES ==========================");
		console.log("All sub-functions: [" + allFuncStack + "]");
		
		console.log("\n================================= ACTUAL DERIVATIVE =================================");
		console.log("Derivative of function: f'(x) = " + finalDeriv);

    }

	/*
		oneDepDeriv takes a string expression and returns the derivative of the outer most function, hence the name "oneDependentDerivative", it only depends
		on the outermost function and doesn't worry about what's inside. It accomplishes this by finding the first instance of an opening parenthesis which symbolizes
		that we've found the inner function, and to have found the inner function would mean we've traversed over the entire outer function. 
	*/
    oneDepDeriv(expr)
	{
		for (let k = 0; k < expr.length; k++)
			if (expr.charAt(k) == '(')
			    return this.derivatives[expr.substring(0, k)];
		
		return "d/dx(" + expr + ")";
	}
	
	/*
		
	*/
    add2Stack(funcStartStack, funcEndQ, functions, parFunction)
	{
		while ((funcEndQ.length == 0) == false)
			functions.push(parFunction.substring(funcStartStack.pop(), funcEndQ.shift()));
    }
    
    productRule(prFunctionsArr)
	{
        let deriv = "";
        let n = prFunctionsArr.length;
		let indDersStringArr = [];
		let variancesStringArr = [];
		
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
		
		for(let i = 0; i < prFunctionsArr.length; i++)
            indDersStringArr[i] = this.oneDepDeriv(prFunctionsArr[i]);

		this.correctVariance(indDersStringArr, variancesStringArr, n);

		
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
    
    correctVariance(indDersStringArr, variancesStringArr, n)
	{
		for (let i = 0; i < n; i++)
		{
			for (let j = 0; j < indDersStringArr[i].length; j++)
			{
				if (indDersStringArr[i].charAt(j) == '?')
				{
					indDersStringArr[i] = indDersStringArr[i].replace(/\?/g, "(" + variancesStringArr[i] + ")");
					break;
				}
				
			}
		}
	}
}

function main ()
{
    let positionFunction = "sin(x)ln(x)";
    console.log("==================== USER INPUT ==========================");
    console.log("Original/Position Function: " + positionFunction);
    let d = new Derivative(positionFunction);
    d.calculate();
}

main();