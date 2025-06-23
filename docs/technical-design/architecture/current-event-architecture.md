# Design of component "Current Event"


This document describes the main aspects of the design of the "Current Event" component.

From a user's perspective, there are two steps to set the current event:
1. Step 1: Select a template for event setting.
2. Step 2: Fill in the mandatory UI elements in the template.

When editing an existing event, only the second step is necessary because the template number is saved as an event property.

## Step 1: Select a template for event setting

In step 1, a tree structure is presented to the user. By clicking on a terminal node in this tree, a template number is determined.

The logic of this step depends on the prepared template number:
1. Vector of text parts (TV) for the template in the selected human language.
2. Visibility vector (VV) of UI elements for this template.
3. Function for converting values from UI elements into the event object.
4. Function for completeness calculation to make the save operation available.

Notice: Only TV depends on using human language. It is important to see, that the availability of some vector component doesn#t depends from human language. (Only values of components are differents for differen languages).

## Step 2: Fill in the mandatory UI elements in the template

For fill data for user will be some UI presented, that contains dynamic and static parts. Below we describe only dynamic part. This part is ein template, that contains following elements:

T1, E, T2; I, T3, S, T4, F, T5, Y, T6, U, T7, X, T8

T1-78 are text parts of template from vector TV. 
Other elements described in table below.

| Element | Description |
|---------|-------------|
| E       | Event type|
| I       | Time interval|
| S       | Start time point |
| F       | Finish time point |
| Y       | Number of used ressource or money units |
| U       | Used ressource of monex units |
| X       | Number of repetition some event or ressource/money using |

