<script>
  $: todos = [];

  const getTodos = () => {
    fetch("http://localhost:5173/api/get-todos")
      .then((res) => res.json())
      .then((data) => {
        console.log("data---->", data);
        todos = data;
      });
  };
  getTodos();

  let title = "";
  $: console.log("title---->", title);

  const handleAddTodoBtn = async () => {
    fetch("http://localhost:5173/api/add-todo", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("response data----->", data);
        todos = [...todos, data];
        title = "";
      });
  };

  const handleDeleteTodoBtn = (id) => {
    fetch("http://localhost:5173/api/delete-todo", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data---->", data);
        let new_todos = todos.filter((item) => item._id !== id);
        todos = new_todos;
      });
  };

  let editTodoId = "";
  const handleEditBtnClick = (id) => {
    editTodoId = id;

    let todo = todos.find((item) => item._id === id);
    console.log("todo--->", todo);
    title = todo.title;
  };
  const haneleEditSubmitBtnClick = () => {
    fetch("http://localhost:5173/api/edit-todo", {
      method: "POST",
      body: JSON.stringify({
        id: editTodoId,
        title: title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data---->", data);
        todos = todos.map((item) => {
          if (item._id === editTodoId) {
            item.title = data.title;
          }
          return item;
        });
        title = "";
        editTodoId = "";
      });
  };
</script>

<div class=" w-[95%] md:w-1/3 mx-auto my-10 border p-1 shadow">
  <div class="text-center p-2">
    <p class="font-extrabold font-serif text-2xl">
      SvelteKit MongoDB Todo List APP
    </p>
  </div>
  <div class="flex items-center p-2">
    <input
      type="text"
      bind:value={title}
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 h-12 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      placeholder="Add Todo"
    />
    {#if editTodoId.length}
      <button
        type="button"
        on:click={haneleEditSubmitBtnClick}
        class="mx-1 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 dark:focus:ring-yellow-900"
      >
        Edit
      </button>
    {:else}
      <button
        on:click={handleAddTodoBtn}
        type="button"
        class="mx-1 my-2 py-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add
      </button>
    {/if}
  </div>
  <div class=" border rounded-lg shadow">
    <div class="text-center p-2">
      <p class="text-2xl">Todo List</p>
    </div>
    <div class="p-2">
      {#each todos as todo, i}
        <div class="flex justify-between items-center p-2 border m-2 rounded">
          <div class=" flex justify-start w-full">
            <p class="font-semibold font-serif px-3">{i + 1}</p>
            <p class="font-semibold font-serif">{todo.title}</p>
          </div>
          <div class=" flex items-center w-full justify-end">
            <button
              type="button"
              on:click={(e) => handleEditBtnClick(todo._id)}
              class="mx-1 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 dark:focus:ring-yellow-900"
            >
              Edit
            </button>
            <button
              on:click={(e) => handleDeleteTodoBtn(todo._id)}
              type="button"
              class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
