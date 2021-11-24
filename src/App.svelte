<script>
  import { onMount } from "svelte";
  
  import Update from "./sounds/Update.mp3";
  import Input from "./sounds/Input.mp3";
  import Delete from "./sounds/Delete.mp3";
  
  let showTasks = [];
  let description;
  let editmode = false;
  let currentId;
  let SondUpdate;
  let SondInput;
  let SondDelete;

  async function Load() {
    const res = await fetch("http://localhost:3000/api/tasks");
    showTasks = await res.json();
    description = "";
    console.log(showTasks);
  }

  function activeEditmode(task) {
    currentId = task._id;
    description = task.description;
    editmode = true;
  }

  async function addTask() {
    if (editmode && currentId) {
      editTask(currentId);
      SondUpdate.play();
      Load();
      editmode = false;
    } else {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        body: JSON.stringify({ description }),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
      const data = await response.json();
      console.log({ ...data });
      SondInput.play();
      Load();
    }
  }
  async function editTask(id) {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ description }),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const data = await response.json();
    console.log({ ...data });
  }

  async function deleteTask(id) {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const data = await response.json();
    console.log({ ...data });
    SondDelete.play();
    Load();
  }

  onMount(async () => {
    Load();
  });
</script>

<div>
  <nav class="light-blue darken-4">
    <div class="container">
      <a class="brand-logo" href="/">ToList - View</a>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <div class="input-field col s12">
                <input type="text" bind:value={description} placeholder="Add your new task"/>
              </div>
              <button on:click={addTask} class="btn light-blue darken-4">
                <i class="material-icons small">{editmode ? "edit" : "add"}</i>
              </button>
            </div>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody class="showTask">
              {#each showTasks as showTask}
                <tr>
                  <td>{showTask.description}</td>
                  <td>
                    <button on:click={() => activeEditmode(showTask)} class="btn light-blue darken-4">
                      <i class="material-icons">edit</i></button>
                    <button on:click={() => deleteTask(showTask._id)} class="btn light-blue darken-4">
                      <i class="material-icons">delete</i></button>
                  </td>
                </tr>
              {:else}
                <p>You have no data to show</p>
              {/each}
            </tbody>
          </table>
          <audio controls class="hidden" bind:this={SondUpdate}>
            <source src={Update} type="audio/mpeg">
          </audio>
          <audio controls class="hidden" bind:this={SondInput}>
            <source src={Input} type="audio/mpeg">
          </audio>
          <audio controls class="hidden" bind:this={SondDelete}>
            <source src={Delete} type="audio/mpeg">
          </audio>
        </div>
      </div>
    </div>
  </div>
</div>
