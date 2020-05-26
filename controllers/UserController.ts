import { User } from "../models/User.ts";
import { Request, Response } from "https://deno.land/x/oak@v4.0.0/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let users: User[] = [{
  id: "1",
  firstName: "Amabelle",
  lastName: "Drewitt",
  email: "adrewitt0@artisteer.com",
  gender: "Female",
  ipAddress: "11.52.90.183",
}, {
  id: "2",
  firstName: "Clementina",
  lastName: "Labarre",
  email: "clabarre1@icio.us",
  gender: "Female",
  ipAddress: "199.168.139.107",
}, {
  id: "3",
  firstName: "Ulrikaumeko",
  lastName: "Minithorpe",
  email: "uminithorpe2@discuz.net",
  gender: "Female",
  ipAddress: "147.253.222.243",
}, {
  id: "4",
  firstName: "Woodie",
  lastName: "Inwood",
  email: "winwood3@va.gov",
  gender: "Male",
  ipAddress: "49.201.35.107",
}, {
  id: "5",
  firstName: "Muire",
  lastName: "Sullivan",
  email: "msullivan4@vkontakte.ru",
  gender: "Female",
  ipAddress: "247.20.167.83",
}, {
  id: "6",
  firstName: "Cirstoforo",
  lastName: "Ucchino",
  email: "cucchino5@mediafire.com",
  gender: "Male",
  ipAddress: "238.24.40.95",
}, {
  id: "7",
  firstName: "Jarred",
  lastName: "Pendergrast",
  email: "jpendergrast6@wikimedia.org",
  gender: "Male",
  ipAddress: "146.86.248.92",
}, {
  id: "8",
  firstName: "Cos",
  lastName: "Baudesson",
  email: "cbaudesson7@cbslocal.com",
  gender: "Male",
  ipAddress: "115.198.51.133",
}, {
  id: "9",
  firstName: "Remington",
  lastName: "Licciardo",
  email: "rlicciardo8@cnn.com",
  gender: "Male",
  ipAddress: "186.229.172.128",
}, {
  id: "10",
  firstName: "Saxon",
  lastName: "Stanlake",
  email: "sstanlake9@sohu.com",
  gender: "Male",
  ipAddress: "223.187.159.162",
}];

// @desc Get all users
// @route GET /api/users
const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    success: true,
    data: users,
  };
};

// @desc Get the user
// @route GET /api/user/:id
const getUser = (
  { params, response }: { params: { id: string }; response: Response },
) => {
  const foundUser = users.find((user) => user.id === params.id);

  if (foundUser) {
    response.status = 200;
    response.body = {
      success: true,
      data: foundUser,
    };
  } else {
    response.status = 404;
    response.body = {
      success: true,
      data: null,
      message: `User with id=${params.id} not found.`,
    };
  }
};

// @desc Add the user
// @route POST /api/users
const addUser = async (
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
    const user: User = value;

    const newId = v4.generate();

    user.id = newId;
    users.push(user);

    response.status = 201;
    response.body = {
      success: true,
      data: user,
    };
  }
};

// @desc Update the user
// @route PUT /api/users/:id
const upadateUser = async (
  { params, request, response }: {
    params: { id: string };
    request: Request;
    response: Response;
  },
) => {
  const foundUser = users.find((user) => user.id === params.id);

  if (foundUser) {
    const { value } = await request.body();
    const updatedUser: Partial<User> = value;

    users = users.map((u) => u.id === params.id ? { ...u, ...updatedUser } : u);

    response.status = 200;
    response.body = {
      success: true,
      data: users,
    };
  } else {
    response.status = 404;
    response.body = {
      success: true,
      data: null,
      message: `User with id=${params.id} not found.`,
    };
  }
};

// @desc Delete the user
// @route DELETE /api/users/:id
const deleteUser = (
  { params, response }: { params: { id: string }; response: Response },
) => {
  const filteredUsers = users.filter((user) => user.id !== params.id);

  if (filteredUsers.length !== users.length) {
    users = filteredUsers;

    response.status = 200;
    response.body = {
      success: true,
      data: users,
    };
  } else {
    response.status = 404;
    response.body = {
      success: true,
      data: null,
      message: `User with id=${params.id} not found.`,
    };
  }
};

export {
  getUsers,
  getUser,
  addUser,
  upadateUser,
  deleteUser,
};
