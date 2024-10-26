export enum StateTask {
  Pendiente = 'Pendiente',
  Realizada = 'Realizada',
}
export interface TaskI {
  id: number;
  title: string;
  description: string;
  state: StateTask;
}
