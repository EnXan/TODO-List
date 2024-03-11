// Wait for the window to load before executing the code
window.addEventListener('load', () => {
    // Get references to necessary DOM elements
    const form = document.querySelector("#new-todo-form");
    const input = document.querySelector("#new-todo-input");
    const listEl = document.querySelector("#todos-container");

    // Add event listener for form submission
    form.addEventListener('submit', (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
    
        // Get the value of the todo input
        const todo = input.value;

        // Check if the input is empty
        if(!todo) {
            // If empty, show an alert and exit the function
            alert("Please fill out the todo");
            return;
        }

        // Create a new todo element
        const todoWrapper = createTodoElement(todo);

        // Append the new todo element to the list
        listEl.appendChild(todoWrapper);

        // Clear the input field after adding the todo
        input.value = "";

        // Get references to the close button and checkbox button within the new todo element
        const todoCloseBtn = todoWrapper.querySelector(".todo_close_btn");
        const todoCheckboxBtn = todoWrapper.querySelector(".todo_checkbox_btn");

        // Add event listener for clicking the checkbox button
        todoCheckboxBtn.addEventListener("click", () => {
            // Get reference to the icon inside the checkbox button
            const todoCheckboxBtnIcon = todoCheckboxBtn.querySelector("i");

            // Show the checkbox icon and add a green color effect
            todoCheckboxBtnIcon.classList.remove("hidden");
            todoCheckboxBtnIcon.classList.add("text-green-300");

            // Add a scaling effect to the todo element
            todoWrapper.classList.add("scale-110");

            // Add event listener for the end of the scaling transition
            todoWrapper.addEventListener("transitionend", () => {
                // After the transition ends, scale down the todo element and close it after a delay
                todoWrapper.classList.add("scale-0");
                setTimeout(closeTodo, 250);
            }, { once: true });
        });

        // Add event listener for clicking the close button
        todoCloseBtn.addEventListener("click", () => {
            // Scale down the todo element and close it after a delay
            todoWrapper.classList.add("scale-0");
            setTimeout(closeTodo, 250);
        });

        // Function to remove the todo element from the list
        function closeTodo() {
            listEl.removeChild(todoWrapper);
        }
    });

    // Function to create a new todo element with the given text
    function createTodoElement(todoText) {
        // Create a new list item element for the todo
        const todoWrapper = document.createElement("li");
        // Add necessary classes to style the todo element
        todoWrapper.classList.add("item", "relative", "flex", "shadow-md", "bubble", "justify-between", "bg-gradient-to-br", "from-[#b060ff]", "to-[#8a5bff]", "p-5", "rounded-xl", "mb-2");

        // Create a container for the todo input and checkbox
        const todoInputContainer = document.createElement("div");
        todoInputContainer.classList.add("input_container", "flex", "justify-center", "gap-4");
        todoWrapper.appendChild(todoInputContainer);
        
        // Create a checkbox button for the todo
        const todoCheckboxBtn = document.createElement("button");
        todoCheckboxBtn.classList.add("text-[24px]", "text-white", "w-10", "h-10", "bg-[#824bff]/50", "shadow-inner", "transition", "hover:bg-[#7f4af1]", "rounded-full", "flex", "justify-center", "items-center", "todo_checkbox_btn");
        todoInputContainer.appendChild(todoCheckboxBtn);

        // Create an icon for the checkbox button
        const todoCheckboxBtnIcon = document.createElement("i");
        todoCheckboxBtnIcon.classList.add("fa-solid", "fa-check", "hidden", "text-white", "shadow-md", "transition");
        todoCheckboxBtn.appendChild(todoCheckboxBtnIcon);

        // Create an input field for the todo text
        const todoInput = document.createElement('input');
        todoInput.classList.add("bg-transparent", "focus:outline-none", "min-w-[250px]", "w-[20vw]", "max-w-[350px]", "text-white");
        todoInput.type = "text";
        todoInput.value = todoText;
        todoInputContainer.appendChild(todoInput);

        // Create a container for the close button
        const todoCloseContainer = document.createElement("div");
        todoCloseContainer.classList.add("text-white", "absolute", "right-0", "pr-3", "top-0", "text-[24px]");
        todoInputContainer.appendChild(todoCloseContainer);

        // Create a close button for the todo
        const todoCloseBtn = document.createElement("button");
        todoCloseBtn.classList.add("todo_close_btn");
        todoCloseContainer.appendChild(todoCloseBtn);

        // Create an icon for the close button
        const todoCloseBtnIcon = document.createElement("i");
        todoCloseBtnIcon.classList.add("fa-solid", "fa-xmark", "active:text-red-700", "hover:text-red-500", "transition", "drop-shadow-lg");
        todoCloseBtn.appendChild(todoCloseBtnIcon);

        // Return the created todo element
        return todoWrapper;
    }
});
