# Jobr

Jobr is a simple, lightweight library that makes easy to create and manage recurrent jobs. Works in browser and node environment.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Node](#node)
  - [Browser](#browser)
  - [Bundler](#bundler)
  - [Instance Options](#instance-options)
  - [API](#api)
  - [Events](#events)
- [Versioning and Backward Compatibility](#versioning-and-backward-compatibility)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install with [npm](https://www.npmjs.com/package/jobr), please execute following command;

```
npm install jobr
```

To install with [yarn](https://yarnpkg.com), please execute following command;

```
yarn add jobr
```

## Usage

### Node

```typescript
import { RecurrentJob } from "jobr";

const recurrentJob = new RecurrentJob({
  name: "hello",
  task: () => "hello world",
  interval: 1000,
  stopOnFail: false
});

const unsubscribe = recurrentJob.subscribe("success", (data) => {
  console.log(data);
});

recurrentJob.start();

unsubscribe();
```

### Browser

if you're just using <script> tags everywhere, use this solution.

```html
<script src="https://unpkg.com/jobr"></script>

<script>
  const recurrentJob = new jobr.RecurrentJob({
    name: "hello",
    task: () => "hello world",
    interval: 1000
  });

  const unsubscribe = recurrentJob.subscribe("success", (data) => {
    console.log(data);
  });

  recurrentJob.start();

  unsubscribe();
</script>
```

### Bundler

Assuming you are using browserify, webpack, rollup, or another bundler, please follow Node usage above.

### Instance Options

| Name       | Description                                                             |
| ---------- | ----------------------------------------------------------------------- |
| name       | Job name (required)                                                     |
| task       | Function that will be invoked at spesified intervals (required)         |
| interval   | Interval value in millisecond (required)                                |
| stopOnFail | Setting true will stop the job if task fails (optional, default: false) |

### API

| Name      | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| start     | Starts the job. If job already started, it will throw an error.       |
| stop      | Stops the job. If job is not started, it will throw an error.         |
| subscribe | Register your listener for a job event. Returns unsubscribe callback. |
| isRunning | Returns true if job is active                                         |

### Events

Jobr comes with built-in eventing system, allows you to listen job state changes.

| Name    | Description                                       |
| ------- | ------------------------------------------------- |
| created | Will be invoked once job created.                 |
| started | Will be invoked when job started.                 |
| stopped | Will be invoked when job stopped.                 |
| success | Will be invoked after task successfully executed. |
| error   | Will be invoked after task failed                 |
| invoked | Will be invoked right before given task called    |

## Versioning and Backward Compatibility

This project follows semantic versioning.

## Roadmap

[ ] Run tasks in worker

[ ] Support cron syntax

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
