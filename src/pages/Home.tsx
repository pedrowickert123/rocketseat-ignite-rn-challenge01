import React, { useState } from "react";

import { Header } from "../components/Header";
import { MyTasksList } from "../components/MyTasksList";
import { TodoInput } from "../components/TodoInput";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle === "") {
      return;
    }

    const task: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, task]);
  }

  function handleMarkTaskAsDone(id: number) {
    setTasks((oldState) =>
      oldState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            done: !item.done,
          };
        }

        return item;
      })
    );
  }

  function handleRemoveTask(id: number) {
    setTasks((oldState) => oldState.filter((item) => item.id !== id));
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  );
}
