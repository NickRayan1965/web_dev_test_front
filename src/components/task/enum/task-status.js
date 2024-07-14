export const TaskStatus = Object.freeze({
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
});

export const TaskStatusLabel = Object.freeze({
  [TaskStatus.PENDING]: 'Pendiente',
  [TaskStatus.COMPLETED]: 'Completada',
});
export const TaskStatusFromLabel = Object.freeze({
  [TaskStatusLabel[TaskStatus.PENDING]]: TaskStatus.PENDING,
  [TaskStatusLabel[TaskStatus.COMPLETED]]: TaskStatus.COMPLETED,
});
export const ListTaskStatus = Object.freeze([
  TaskStatus.PENDING,
  TaskStatus.COMPLETED,
]);
export const ListTaskStatusLabel = Object.freeze([
  TaskStatusLabel[TaskStatus.PENDING],
  TaskStatusLabel[TaskStatus.COMPLETED],
]);