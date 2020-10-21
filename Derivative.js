class Derivative
{
    constructor(posFunc)
    {
        console.log("================ IN CONSTRUCTOR ==================");
        this.posFunc = posFunc; 
        this.derivatives = {};
        this.derivatives["cos"] = "-sin";
        this.derivatives["sin"] = "cos";
        this.derivatives["sec"] = "sectan";
        this.derivatives["csc"] = "-csccot";
        this.derivatives["tan"] = "sec^2";
        this.derivatives["cot"] = "-csc^2";
        this.derivatives["ln"] = "(1 / *)";
    }

    calculate ()
    {
        console.log("================ IN CALCULATE ==================");
        let funcSub = "";
		let allFuncStack = [];
		let funcStartStack = [];
		let funcEndQ = [];
		let prFunctionsArr = [];
		let allFunctionsDerivArr = [];
		let derivativesArr = [];
        let start = 0;
        let end = 0;

        funcStartStack.push(0);

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
					add2Stack(funcStartStack, funcEndQ, allFuncStack, this.posFunc);
					funcStartStack.push(i + 1);
                    prFunctionsArr.push(allFuncStack.peek());
				}
			}
			
			if (funcEndQ.length == 0 && funcStartStack.length == 0 && i < 1)
			{
				
			}
        }
        
        funcEndQ.push(this.posFunc.length);
		
		while ( (funcStartStack.length == 0) == false && (funcEndQ.length == 0) == false)
		{
			start = funcStartStack.pop();
			end = funcEndQ.shift();
			funcSub = this.posFunc.substring(start, end);
			
			allFuncStack.push(funcSub);
		}
		
		prFunctionsArr.push(allFuncStack[allFuncStack.length - 1]);
		
		for (let element in allFuncStack)
			allFunctionsDerivArr.push(element);
		
		
		// let finalDeriv = productRule(prFunctionsArr);
		// let otherDeriv = productRule(allFunctionsDerivArr);
		//String chainRuleDerv = chainRule (crFunctions);
		
		console.log("\n========================== DEBUGGING PURPOSES ==========================");
		console.log("All sub-functions: [" + allFuncStack + "]");
		console.log("Product rule functions: [" + prFunctionsArr + "]");
		console.log("Derivative of each sub-function: [" + derivativesArr + "]");
		console.log("Func_End: [" + funcEndQ + "]");
		
		console.log("\n================================= ACTUAL DERIVATIVE =================================");
		// console.log("Derivative of function: f'(x) = " + finalDeriv);
		// console.log("Derivative of function: f'_2(x) = " + otherDeriv);

    }
    
    add2Stack(funcStartStack, funcEndQ, functions, parFunction)
	{
        console.log("================ IN A2S ==================");

		while ((funcEndQ.length == 0) == false)
			functions.push(parFunction.substring(funcStartStack.pop(), funcEndQ.shift()));
    }
    
    productRule(prFunctionsArr)
	{
        console.log("================ IN PR ==================");
        let deriv = "";
        let n = prFunctionsArr.length;
		let indDersStringArr = [];
		let variancesStringArr = [];
		
		console.log("PR F: " + prFunctionsArr);
		
		for (let i = 0; i  < prFunctionsArr.length; i++)
		{
			for (let k = 0; k < prFunctionsArr.get(i).length(); k++)
			{
				if (prFunctionsArr.get(i).charAt(k) == '(')
					variancesStringArr[i] = prFunctionsArr[i].substring(k + 1, prFunctionsArr[i].indexOf(')'));
			}
		}
		
		for(let i = 0; i < prFunctionsArr.length; i++)
            indDersStringArr[i] = oneDepDeriv(prFunctionsArr[i]);

		correctVariance(indDersStringArr, variancesStringArr, n);

		
		for (let i = 0; i < prFunctionsArr.length; i++)
		{
			deriv += indDersStringArr[i]; 
			for (let j = 0; j < prFunctionsArr.length; j++)
			{
				if (i != j)
				{
					deriv += prFunctionsArr.get(j);
				}
			}
			
			deriv += " + ";
		}
	
		for (let i = 0; i < indDersStringArr.length; i++)
            console.log(indDersStringArr[i] + " ");

		deriv += "0";
		
		for (let i = 0; i < variancesStringArr.length; i++)
            console.log(variancesStringArr[i] + " ");

		console.log("Deriv: " + deriv);
		
		return deriv;
    }
    
    correctVariance(indDersStringArr, variancesStringArr, n)
	{
        console.log("================ IN CV ==================");

		for (let i = 0; i < n; i++)
		{
			for (let j = 0; j < indDersStringArr[i].length; j++)
			{
				if (indDersStringArr[i].charAt(j) == '?')
				{
					indDersStringArr[i] = indDersStringArr[i].replaceAll("\\?", "(" + variancesStringArr[i] + ")");
					return;
				}
				
			}
		}
	}
}

function main ()
{
    console.log("================ IN MAIN ==================");
    let d = new Derivative("sin(x)tan(x)");
    d.calculate();
}

main();