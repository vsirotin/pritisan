# Name conventions

**User Stories** have a names like S-ab, there ab - two digit unic number of story, started with 01.

Each User Story is placed in separate dirctoty together with files for its use cases.

**Use Cases** have a names like U-ab-cd, there ab - name of parent User Story, cd - two digit number of cases, started with 01. Number is unic in set of Use Cases their parent User Story. 
Each Use Case is defined in separate file together with theit Test Cases.

**Test Cases** have a names T-ab-cd-ef two digit number of cases, started with 01. Number is unic in set of Test Cases their parent Use Case. 

# Structure conventions 

**User Story file** contains its description. There are no structural conventions/restrictions for it.

**Use Case file** contains:
- Use Case Description
- List of Test Cases.

Use case description contains a sequence of steps. Each step makes some agent. In our project there are only two agents:
- User
- System

Each agent on each step can either make some action or some decision. 
User's actions have a names like U-xy there xy is a two digit number unic inside an use cases (among user's actions). 

Systems's actions have a numbers like S-xy there xy is a two digit number unic inside an use cases (among system's actions).

Desigions have a names like DU-xy (for user's decisions) and DS-xy (for system's decisions). 
A numbers in actions and decisions can be shorted to one digit or even omitted by short use cases. 

An action contains a name and either some action description or a name of some other use cases.

A decision contains a name and list of rules. 

Each rule has structure like if statemts in programming languages: 

```
IF(condition) THEN action or decsion ELSE action or decision
```













