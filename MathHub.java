import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;
import java.util.Stack;

public class MathHub 
{
	private static HashMap<String, String> derivativeList = new HashMap<String, String>();
	
	public static void main(String [] args)
	{
		
		derivativeList.put("tan", "sec^2?");
		derivativeList.put("sin", "cos?");
		derivativeList.put("cos", "-sin?");
		derivativeList.put("cot", "-csc^2?");
		derivativeList.put("csc", "-csc?cot?");
		derivativeList.put("sec", "sec?tan?");
		derivativeList.put("x", "1");
		
		String function, funcSub;
		Scanner input = new Scanner(System.in);
		Stack<String> allFunctions = new Stack<String>();
		Stack<Integer> funcStart = new Stack<Integer>();
		Queue<Integer> funcEnd = new LinkedList<Integer>();
		ArrayList<String> prFunctions = new ArrayList<String>();
		ArrayList<String> allFunctionsDerivatives = new ArrayList<String>();
		LinkedList<String> derivatives = new LinkedList<String>();
		int start = 0, end = 0;
		funcStart.push(0);
		
		System.out.println("========================== USER INPUT ==========================");
		System.out.print("Enter your function: ");
		function = input.nextLine();
		
		
		for (int i = 0; i < function.length(); i++)
		{
			if (function.charAt(i) == '(')
				funcStart.push(i + 1);
			else if (function.charAt(i) == ')')
			{	
				end = i;
				funcEnd.add(end);
				
				if (i + 1 < function.length() && funcStart.size() == funcEnd.size() + 1)
				{	
					funcEnd.add(i + 1);
					add2Stack(funcStart, funcEnd, allFunctions, function);
					funcStart.push(i + 1);
					prFunctions.add(allFunctions.peek());
				}
			}
		}
		
		funcEnd.add(function.length());
		
		while (funcStart.isEmpty() == false && funcEnd.isEmpty() == false)
		{
			start = funcStart.pop();
			end = funcEnd.remove();
			funcSub = function.substring(start, end);
			
			allFunctions.push(funcSub);
		}
		
		prFunctions.add(allFunctions.peek());
		
		int n = allFunctions.size();
		
		for (String i : allFunctions)
			allFunctionsDerivatives.add(i);
		
		
		String finalDeriv = productRule(prFunctions);
		String otherDeriv = productRule(allFunctionsDerivatives);
		
		System.out.println("\n========================== DEBUGGING PURPOSES ==========================");
		System.out.println("All sub-functions: " + allFunctions);
		System.out.println("Product rule functions: " + prFunctions);
		System.out.println("Derivative of each sub-function: " + derivatives);
		
		System.out.println("\n================================= ACTUAL DERIVATIVE =================================");
		System.out.println("Derivative of function: f'(x) = " + finalDeriv);
		System.out.println("Derivative of function: f'_2(x) = " + otherDeriv);
		
		input.close();
	}
	
	private static void add2Stack(Stack<Integer> start, Queue<Integer> end, Stack<String> functions, String function)
	{
		while (end.isEmpty() == false)
			functions.push(function.substring(start.pop(), end.remove()));
	}
	
	private static String oneDepDeriv(String expr)
	{
		for (int k = 0; k < expr.length(); k++)
			if (expr.charAt(k) == '(')
				return derivativeList.get(expr.substring(0, k));
		
		return "d/dx(" + expr + ")";
	}
	
	private static String chainRule(Stack<String> crFunctions)
	{
		return "";
	}
	
	private static String productRule(ArrayList<String> prFunctions)
	{
		String deriv = "";
		int n = prFunctions.size();
		String [] indDers = new String[n];
		String [] variances = new String [n];
		
		System.out.println("PR F: " + prFunctions + ". N: " + n);
		
		for (int i = 0; i  < prFunctions.size(); i++)
		{
			for (int k = 0; k < prFunctions.get(i).length(); k++)
			{
				if (prFunctions.get(i).charAt(k) == '(')
					variances[i] = prFunctions.get(i).substring(k + 1, prFunctions.get(i).indexOf(')'));
			}
		}
		
		for(int i = 0; i < prFunctions.size(); i++)
			indDers[i] = oneDepDeriv(prFunctions.get(i));
		correctVariance(indDers, variances, n);

		
		for (int i = 0; i < prFunctions.size(); i++)
		{
			deriv += indDers[i]; 
			for (int j = 0; j < prFunctions.size(); j++)
			{
				if (i != j)
				{
					deriv += prFunctions.get(j);
				}
			}
			
			deriv += " + ";
		}
	
		for (int i = 0; i < indDers.length; i++)
			System.out.print(indDers[i] + " ");
		deriv += "0";
		
		for (int i = 0; i < variances.length; i++)
			System.out.print(variances[i] + " ");
		System.out.println();
		
		return deriv;
	}
	
	private static void correctVariance(String [] indDers, String [] variances, int n)
	{
		for (int i = 0; i < n; i++)
		{
			for (int j = 0; j < indDers[i].length(); j++)
			{
				if (indDers[i].charAt(j) == '?')
				{
					indDers[i] = indDers[i].replaceAll("\\?", "(" + variances[i] + ")");
					break;
				}
				
			}
		}
	}
	
	private static boolean isOperation(char c)
	{
		switch(c)
		{
			case '*':
				return true;
			case '+':
				return true;
			case '-':
				return true;
			case '/':
				return true;
			default:
				return false;
		}
	}

}

class Function
{
	
}