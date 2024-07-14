import { TaskPriorityLabel } from "../enum/task-priority";

export default function getTaskDataFormated(data) {
  console.log({ data });
  return {
    ...data,
    categoryIds: data?.selectedCategories?.map((c) => c._id),
    selectedCategories: undefined,
  };
}
export const getCreatedTaskFormated = (task) => {
  return {
    name: task.name,
    description: task.description,
    priority: TaskPriorityLabel[task.priority],
    selectedCategories: task.categories,
    expiration: new Date(task.expiration),
  }
};