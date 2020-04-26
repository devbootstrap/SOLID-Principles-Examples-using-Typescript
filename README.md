# SOLID Principles Examples using Typescript

This tutorial was insprired from the [Encapsulation SOLID](https://app.pluralsight.com/library/courses/encapsulation-solid/table-of-contents) course on Pluralsigt.

## What is SOLID

SOLID is an acronym for the following:

* **S** - Single Responsibility Principle ([SRP](./srp))
* **O** - Open Closed Principle ([OCP](./ocp))
* **L** - Liskov Substitution Principle ([LSP](./lsp))
* **I** - Interface Segregation Principle ([ISP](./isp))
* **D** - Dependency Inversion Principle ([DIP](./dip))

## How to use this tutorial

Start with the original file [FileStore.ts](./FileStore.ts) and we then take that and apply refectorings step by step in the order of SOLID.

So prehaps take a look at the original file as a reference. As you can see all the functionality is included in this file and none of the SOLID priniples have yet to be applied. Then move to each priniple one at a time folowing the same order of SOLID.

If you want to jump directly to the final solution, that is once all the SOLID priniples have been applied to this original file, then take a look at the code in the ependency Inversion Principle ([DIP](./dip)) folder. In that code **all** the SOLID principles have been applied. If you want a sort of journey on how we got there, I suggest following each step at a time.

So, what are you waiting for? Navigate to the separate folder linked above in this repo for further explainations and an example application written in [Typescript](https://www.typescriptlang.org/).