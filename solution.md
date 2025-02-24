# Documentation

## Overview

This project was built with React, which is what I'm most familiar with at the moment. For styling I used Tailwind CSS instead of vanilla CSS for better development experience. A live demo has been deployed to Cloudflare Pages at <https://covergo.vietthe.dev> so you can access it easily. Below are a few aspects of the project.

## Project structure

```text
src
 |- common     - this is where common code is shared across the project such as constants, types and helpers
 |- components - this directory works like a library; it contains common components with some styles applied
 |- data       - the data which would be retrieved from external services in practice
 |- hooks      - common React Hooks
 |- locales    - resources used for i18n
```

## Testing

There are two test files in the project.

```text
src
 |- common
     |- helpers.test.ts - test common code such as calculation logic and form validator
 |- App.test.tsx        - test the flows of the wizard
```

## What could be improved

* Extract form logic into reusable code for better value handling and validation
* A more flexible structure of the Wizard component to reduce repetitive code
* Make use of URL parameters for better user experience (page reload or pre-filled values for example)
