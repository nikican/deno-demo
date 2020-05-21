import { User } from "../models/User.ts";

const users: User[] = [{
  id: 1,
  firstName: "Amabelle",
  lastName: "Drewitt",
  email: "adrewitt0@artisteer.com",
  gender: "Female",
  ipAddress: "11.52.90.183",
}, {
  id: 2,
  firstName: "Clementina",
  lastName: "Labarre",
  email: "clabarre1@icio.us",
  gender: "Female",
  ipAddress: "199.168.139.107",
}, {
  id: 3,
  firstName: "Ulrikaumeko",
  lastName: "Minithorpe",
  email: "uminithorpe2@discuz.net",
  gender: "Female",
  ipAddress: "147.253.222.243",
}, {
  id: 4,
  firstName: "Woodie",
  lastName: "Inwood",
  email: "winwood3@va.gov",
  gender: "Male",
  ipAddress: "49.201.35.107",
}, {
  id: 5,
  firstName: "Muire",
  lastName: "Sullivan",
  email: "msullivan4@vkontakte.ru",
  gender: "Female",
  ipAddress: "247.20.167.83",
}, {
  id: 6,
  firstName: "Cirstoforo",
  lastName: "Ucchino",
  email: "cucchino5@mediafire.com",
  gender: "Male",
  ipAddress: "238.24.40.95",
}, {
  id: 7,
  firstName: "Jarred",
  lastName: "Pendergrast",
  email: "jpendergrast6@wikimedia.org",
  gender: "Male",
  ipAddress: "146.86.248.92",
}, {
  id: 8,
  firstName: "Cos",
  lastName: "Baudesson",
  email: "cbaudesson7@cbslocal.com",
  gender: "Male",
  ipAddress: "115.198.51.133",
}, {
  id: 9,
  firstName: "Remington",
  lastName: "Licciardo",
  email: "rlicciardo8@cnn.com",
  gender: "Male",
  ipAddress: "186.229.172.128",
}, {
  id: 10,
  firstName: "Saxon",
  lastName: "Stanlake",
  email: "sstanlake9@sohu.com",
  gender: "Male",
  ipAddress: "223.187.159.162",
}];

// @desc Get all users
// @route GET /api/users
export const getUsers = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: users,
  };
};

// @desc Get the user
// @route GET /api/user/:id
export const getUser = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const foundUser = users.find((user) =>
    user.id === Number.parseInt(params.id)
  );

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
