import { Dinosaur } from "../models/Dinosaur.ts";
import { Request, Response } from "https://deno.land/x/oak@v4.0.0/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let dinosaurs: Dinosaur[] = [
  {
    id: "1",
    name: "Velociraptor",
    era: "Late Cretaceous",
    diet: "Carnivorous",
    regions: [
      "Asia",
    ],
    heigth: 2,
    length: 6,
    weigth: 33,
  },
  {
    id: "2",
    name: "Triceratops",
    era: "Late Cretaceous",
    diet: "Herbivorous",
    regions: [
      "North America",
    ],
    heigth: 10,
    length: 33,
    weigth: 26800,
  },
  {
    id: "3",
    name: "Tyrannosaurus Rex",
    era: "Late Cretaceous",
    diet: "Carnivorous",
    regions: [
      "North America",
    ],
    heigth: 13,
    length: 39,
    weigth: 13310,
  },
  {
    id: "4",
    name: "Stegosaurus",
    era: "Late Jurassic",
    diet: "Omnivorous",
    regions: [
      "North America",
      "Europe",
    ],
    heigth: 14,
    length: 29,
    weigth: 6000,
  },
  {
    id: "5",
    name: "Iguanodon",
    era: "Early Cretaceous",
    diet: "Herbivorous",
    regions: [
      "North America",
      "Europe",
    ],
    heigth: 16,
    length: 33,
    weigth: 11000,
  },
];

// @desc Get all dinosaurs
// @route GET /api/dinosaurs
const getDinosaurs = ({ response }: { response: Response }) => {
  response.body = {
    success: true,
    data: dinosaurs,
  };
};

// @desc Get the dinosaur
// @route GET /api/dinosaur/:id
const getDinosaur = (
  { params, response }: { params: { id: string }; response: Response },
) => {
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
const addDinosaur = async (
  { request, response }: { request: Request; response: Response },
) => {
  const { value } = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      data: null,
      message: "Invalid data.",
    };
  } else {
    const dinosaur: Dinosaur = value;

    const newId = v4.generate();

    dinosaur.id = newId;
    dinosaurs.push(dinosaur);

    response.status = 201;
    response.body = {
      success: true,
      data: dinosaur,
    };
  }
};

// @desc Update the dinosaur
// @route PUT /api/dinosaurs/:id
const upadateDinosaur = async (
  { params, request, response }: {
    params: { id: string };
    request: Request;
    response: Response;
  },
) => {
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
  { params, response }: { params: { id: string }; response: Response },
) => {
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
