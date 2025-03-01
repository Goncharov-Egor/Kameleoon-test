# Interview task for frontend developers

This is a test task to asses your skills in React.js, HTML and CSS.

### Technical requirements

- To complete this task, you can use Vite/Parcel/Rsbuild.
- You are not allowed to use any external libraries except for `node-sass`, `axios`, `classnames`, `react-router-dom`, `prop-types`;
- You can use `prop-types` library if you don't use **`TypeScript`**.
- Demonstrate use of **`React hooks`**.
- You can use **`css`** or **`scss`** of your choice.

### Functionality requirements

The app is a dashboard page which used to display a list of created A/B tests ([Figma](https://www.figma.com/file/PFdFpIajQbuGibIbEYnE3l/Interview-task-for-frontend-developers)).

![Mockup](./resources/dashboard-mockup.png)

- The table is filled with the data that is requested from the JSON file using the API in [this repository](https://development.kameleoon.net/oivanov/frontend-interview-task-api). You need to clone the project to your local machine and run it.
- When a user hovers over a table row it should be highlighted as shown in the mockup.
- Sites in the corresponding column must be displayed without the **`http`** or **`https`** protocols and **`www`** prefix.
- A user should be able to filter by item name. If the item exists we hide other
records and show only items that were found in the list. If no records are found there should
be a message with the corresponding text and a reset button (see [Figma](https://www.figma.com/file/PFdFpIajQbuGibIbEYnE3l/Interview-task-for-frontend-developers)).
- A user should be able to sort (**`ASC`**, **`DESC`**) by clicking on the titles of the columns:
  - **`name`**, **`type`** and **`site`** should be sorted in alphabetical order
  - **`status`** should be sorted in:
    - **`ASC`**: Online, Paused, Stopped, Draft
    - **`DESC`**: Draft, Stopped, Paused, Online

### Additional tasks

- Using the `react-router-dom` library, implement routing between three pages: **`dashboard`**, **`results`**, and **`finalize`**. And don't forget to load the necessary data for each page.
- When a user clicks on the **`Results`** or **`Finalize`** button on dashboard page, you should redirect to URLs **`/results/[testId]`** and **`/finalize/[testId]`** accordingly, without reloading the browser window.

It will be a plus if you:
- will use TypeScript to complete the task
- write tests
- if a user can interact with the interface using the keyboard.


### The result of executing

The solution to this task is recommended to be posted on any public git service of your choice.

Good luck!
