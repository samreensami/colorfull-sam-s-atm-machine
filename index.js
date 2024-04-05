#! /user/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let mybalance = 50000;
let mypin = 1234;
console.log(chalk.blueBright("\n \twelcome to samATM\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellowBright("enter your pin code:")
    }
]);
if (pinAnswer.pin === mypin) {
    console.log(chalk.red("pin is correct,login successfully!"));
    // console.log(`current account balance is${mybalance}`)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "select an operation:",
            choices: ["withdraw amount", "checkbalance"]
        }
    ]);
    if (operationAns.operation === "withdraw amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawmethod",
                type: "list",
                message: "select a withdrawmethod:",
                choices: ["fastcash", "enter amount"]
            }
        ]);
        if (withdrawAns.withdrawmethod === "fastcash") {
            let fastcashAns = await inquirer.prompt([
                {
                    name: "fastcash",
                    type: "list",
                    message: "select amount:",
                    choices: [1000, 2000, , 5000, 10000]
                }
            ]);
            if (fastcashAns.fastcash > mybalance) {
                console.log(chalk.gray("insuficient balance"));
            }
            else {
                mybalance -= fastcashAns.fastcash;
                console.log(chalk.bgYellow(`${fastcashAns.fastcash}withdraw successfully`));
                console.log(chalk.blue(`your remaining balance is:${mybalance}`));
            }
        }
        else if (withdrawAns.withdrawmethod === "enter amount") {
            let amountAns = await inquirer.prompt([
                {
                    message: "enter the amount to withdraw:",
                    type: "number",
                    name: "amount"
                }
            ]);
            if (amountAns.amount > mybalance) {
                console.log("insuficient balance");
            }
            else {
                mybalance -= amountAns.amount;
                console.log(`${amountAns.amount}withdraw successfully`);
                console.log(`your remaining balance is :${mybalance}`);
            }
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log(`your account balance is:${mybalance}`);
    }
}
else {
    console.log("pin is incorrect,try again");
}
