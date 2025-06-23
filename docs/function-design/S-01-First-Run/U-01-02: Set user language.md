# Use Case: Set User Language

**Description:** This use case describes how the system sets and stores the user's preferred UI language for the application, both in the current session and in the browser's memory for future sessions.

**Steps:**

S-01: The system attempts to determine the browser's language.

DS-01: IF a browser language is retrieved THEN proceed to DS-02 ELSE set the proposed language to the default application language and proceed to S-02.

DS-02: IF the retrieved language is in the list of supported languages THEN set it as the proposed language ELSE set the proposed language to the default application language.

S-02: Display the Language Selection Dialog.

U-01: The user either confirms the proposed language or selects a different language and confirms their selection.

S-03: The system saves the user's selected language in the current session and stores it in the browser's memory for subsequent sessions.

**End of Use Case.**
