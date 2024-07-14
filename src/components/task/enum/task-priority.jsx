export const TaskPriority = Object.freeze({
  URGENT: 'URGENT',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
});

export const TaskPriorityLabel = Object.freeze({
  [TaskPriority.URGENT]: 'Urgente',
  [TaskPriority.HIGH]: 'Alta',
  [TaskPriority.MEDIUM]: 'Media',
  [TaskPriority.LOW]: 'Baja',
});
export const TaskPriorityFromLabel = Object.freeze({
  [TaskPriorityLabel[TaskPriority.URGENT]]: TaskPriority.URGENT,
  [TaskPriorityLabel[TaskPriority.HIGH]]: TaskPriority.HIGH,
  [TaskPriorityLabel[TaskPriority.MEDIUM]]: TaskPriority.MEDIUM,
  [TaskPriorityLabel[TaskPriority.LOW]]: TaskPriority.LOW,
});
export const ListTaskPriority = Object.freeze([
  TaskPriority.URGENT,
  TaskPriority.HIGH,
  TaskPriority.MEDIUM,
  TaskPriority.LOW,
]);
export const ListTaskPriorityLabel = Object.freeze([
  TaskPriorityLabel[TaskPriority.URGENT],
  TaskPriorityLabel[TaskPriority.HIGH],
  TaskPriorityLabel[TaskPriority.MEDIUM],
  TaskPriorityLabel[TaskPriority.LOW],
]);