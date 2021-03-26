export type Config = {
  name: string;
  /**
   * Function that will be invoked at specified intervals
   */
  task: () => unknown;
  /**
   * @type millisecond
   */
  interval: number;
  /**
   * Setting true will stop the job if task fails
   * @default false
   */
  stopOnFail?: boolean;
};
