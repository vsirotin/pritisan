# Use Case: Inform User About App

**Description:** This use case describes how the system informs the user about the application's main features, including initial explanations and updates for new versions.

**Steps:**

S-01: The system attempts to retrieve information about the last explained version of the application.

DS-01: IF information about the last explained version of the application is NOT retrieved THEN the system displays the initial explanation dialog and proceeds to U-01 ELSE proceed to DS-02.

DS-02: IF the current application version is newer than the last explained version THEN the system displays a dialog about the features of the current version (if such information exists) and saves information about the last explained version of the application ELSE End of Use Case.

U-01: The user closes the dialog.

**End of Use Case.**


