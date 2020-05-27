# <img src="https://deno.land/logo.svg" width="30" height="30"> Deno demo

A simple REST API using [Deno](https://deno.land/) and [Oak](https://oakserver.github.io/oak/).

## Getting Started

Install Deno following the [instructions](https://deno.land/#installation).

## Run

```
deno run --allow-net App.ts
```

## Built With

- [Deno](https://deno.land/) - A **secure** runtime for **JavaScript** and **TypeScript**.
- [Oak](https://oakserver.github.io/oak/) - A middleware framework for Deno's net server

## Routes

- GET `/dinosaurs` : Fetches list of all dinosaurs
- POST `/dinosaurs` : Let's you create a dinosaur

```
 {
    "id": "1",
    "name": "Velociraptor",
    "era": "Late Cretaceous",
    "diet": "Carnivorous",
  },
```

- GET `/dinosaurs/:id` : Fetch a single dinosaur
- PUT `/dinosaurs/:id` : Update details of a dinosaur
- DELETE `/dinosaurs/:id` : Delete a dinosaur
