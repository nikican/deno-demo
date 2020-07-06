import { Dinosaur } from "../models/Dinosaur.ts";
import { RouterContext } from "https://deno.land/x/oak@v4.0.0/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";
import { dbConfig } from "../config.ts";

// initialize db connection
const client = new Client(dbConfig);

let dinosaurs: Dinosaur[] = [
  {
    id: "1",
    name: "Velociraptor",
    era: "Late Cretaceous",
    diet: "Carnivorous",
  },
  {
    id: "2",
    name: "Triceratops",
    era: "Late Cretaceous",
    diet: "Herbivorous",
  },
  {
    id: "3",
    name: "Tyrannosaurus Rex",
    era: "Late Cretaceous",
    diet: "Carnivorous",
  },
  {
    id: "4",
    name: "Stegosaurus",
    era: "Late Jurassic",
    diet: "Omnivorous",
  },
  {
    id: "5",
    name: "Iguanodon",
    era: "Early Cretaceous",
    diet: "Herbivorous",
  },
];

async function main() {
}

// @desc Get all dinosaurs
// @route GET /api/dinosaurs
const getDinosaurs = async (ctx: RouterContext) => {
  try {
    await client.connect();

    const result = await client.query("SELECT * FROM dinosaur");

    const columns = result.rowDescription.columns.map((column) => column.name);

    const dinosaurs = result.rows.map((dino) => {
      const dinosaur: any = {};
      columns.forEach((element, i) => {
        dinosaur[element] = dino[i];
      });

      return dinosaur;
    });

    ctx.response.body = {
      success: true,
      data: dinosaurs,
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      data: null,
      message: error.toString(),
    };
  } finally {
    await client.end();
  }

  ctx.response.body = {
    success: true,
    data: dinosaurs,
  };
};

// @desc Get the dinosaur
// @route GET /api/dinosaur/:id
const getDinosaur = (ctx: RouterContext) => {
  const { params, response } = ctx;
  const foundDinosaur = dinosaurs.find((dinosaur) => dinosaur.id === params.id);

  if (foundDinosaur) {
    response.status = 200;
    response.body = {
      success: true,
      data: foundDinosaur,
    };
  } else {
    response.status = 404;
    response.body = {
      success: true,
      data: null,
      message: `Dinosaur with id=${params.id} not found.`,
    };
  }
};

// @desc Add the dinosaur
// @route POST /api/dinosaurs
const addDinosaur = async (ctx: RouterContext) => {
  const { request, response } = ctx;
  const { value:dinosaur } = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      data: null,
      message: "Invalid data.",
    };
  } else {
    try {
      await client.connect();
      const result = await client.query(
        "INSERT INTO dinosaur (name, era, diet) VALUES($1,$2,$3)",
        dinosaur.name,
        dinosaur.era,
        dinosaur.diet,
      );

      response.status = 201;
      response.body = {
        success: true,
        data: dinosaur,
      };
    } catch (error) {
      response.status = 500;
      response.body = {
        success: false,
        message: error.toString(),
      };
    } finally {
      await client.end();
    }
  }
};

// @desc Update the dinosaur
// @route PUT /api/dinosaurs/:id
const upadateDinosaur = async (ctx: RouterContext) => {
  const { params, request, response } = ctx;
  const foundDinosaur = dinosaurs.find((dinosaur) => dinosaur.id === params.id);

  if (foundDinosaur) {
    const { value } = await request.body();
    const updatedDinosaur: Partial<Dinosaur> = value;

    dinosaurs = dinosaurs.map((u) =>
      u.id === params.id ? { ...u, ...updatedDinosaur } : u
    );

    response.status = 200;
    response.body = {
      success: true,
      data: dinosaurs,
    };
  } else {
    response.status = 404;
    response.body = {
      success: true,
      data: null,
      message: `Dinosaur with id=${params.id} not found.`,
    };
  }
};

// @desc Delete the dinosaur
// @route DELETE /api/dinosaurs/:id
const deleteDinosaur = (
  ctx: RouterContext,
) => {
  const { params, response } = ctx;
  const filteredDinosaurs = dinosaurs.filter((dinosaur) =>
    dinosaur.id !== params.id
  );

  if (filteredDinosaurs.length !== dinosaurs.length) {
    dinosaurs = filteredDinosaurs;

    response.status = 200;
    response.body = {
      success: true,
      data: dinosaurs,
    };
  } else {
    response.status = 404;
    response.body = {
      success: true,
      data: null,
      message: `Dinosaur with id=${params.id} not found.`,
    };
  }
};

export {
  getDinosaurs,
  getDinosaur,
  addDinosaur,
  upadateDinosaur,
  deleteDinosaur,
};
