import prisma from "../services/prisma.service";
import {
  CreateStaffRecordSchemaType,
  CreateStaffSchemaType,
  StaffSchemaType,
} from "../schema/staff.schema";
import { FastifyRequest, FastifyReply } from "fastify";

/**
 * If a user is logged in, this function will return their details
 * @param request Fastify request
 * @param reply Fastify reply
 * @returns The currently logged in user or 204 if no user is logged in
 */
export const promote = async (
  request: FastifyRequest<{ Params: StaffSchemaType }>,
  reply: FastifyReply
) => {
  const userId = request.params.userId;

  const { password, ...user } = await prisma.user.update({
    where: {
      userId: userId,
    },
    data: {
      userType: "staff",
    },
  });

  return reply.status(200).send(user);
};

export const demote = async (
  request: FastifyRequest<{ Params: StaffSchemaType }>,
  reply: FastifyReply
) => {
  const userId = request.params.userId;

  const { password, ...user } = await prisma.user.update({
    where: {
      userId: userId,
    },
    data: {
      userType: "customer",
    },
  });

  return reply.status(200).send(user);
};

export const getStaff = async (
  request: FastifyRequest<{ Params: StaffSchemaType }>,
  reply: FastifyReply
) => {
  const userId = request.params.userId;

  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
  });

  return reply.status(200).send(user);
};

export const createStaffRecord = async (
  request: FastifyRequest<{ Body: CreateStaffRecordSchemaType }>,
  reply: FastifyReply
) => {
  /*
    customerId    String          @id @default(cuid())
    user          User            @relation(fields: [userId], references: [userId])
    userId        String          @unique
    isAnonymous   Boolean         @default(false)
    sex           String
  */
  // const {email,name, address, userType } = request.body;

  // userID, isAnonmyous (boolean), gender (sex)

  const { userID, isAnonmyous, sex, email } = request.body;

  // Check that the user exists
  // If the user exists we want to grab the user data (so that we can insert into our table)
  const userExists = await prisma.user.findUnique({
    where: {
      userId: userID,
    },
  });

  if (!userExists) {
    return reply.badRequest("User does not exist");
  }

  // Create the customerDetail record
  const customerDetail = await prisma.user.update({
    where: {
      userId: userID,
    },
    data: {
      customerDetails: {
        update: {
          isAnonymous: isAnonmyous,
          sex: sex,
        },
      },
    },
  });

  return reply.status(200).send(customerDetail);

  // const userExists = await prisma.user.findUnique({
  //   where: {
  //     email,
  //   },
  // });

  // if (userExists) {
  //   return reply.badRequest("User already exists");
  // }

  // const user = await prisma.customerDetails.create({
  //   data: {
  //     name,
  //     email,
  //     userType,
  //     address,
  //   },
  //   select: {
  //     address: true,
  //     email: true,
  //     userType: true,
  //     name: true,
  //   },
  // })

  // return reply.status(200).send(user);
};

// export const register = async (
//   request: FastifyRequest<{ Body: RegisterSchemaType }>,
//   reply: FastifyReply
// ) => {
//   const { email, password, name, phone, address } = request.body;
//   const passwordHash = await argon2.hash(password);

//   const userExists = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (userExists) {
//     return reply.badRequest("User already exists");
//   }

//   const user = await prisma.user.create({
//     data: {
//       email,
//       password: passwordHash,
//       name,
//       phone,
//       address,
//     },
//     select: {
//       userId: true,
//       email: true,
//       userType: true,
//       shippingAddress: true,
//       billingAddress: true,
//       name: true,
//     },
//   });

//   request.session.set("passport", user.userId);

//   return reply.status(201).send(user);
// };
