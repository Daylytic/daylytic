import { RequestError } from "utils/error.js";
import { convertToTimeZoneISO8601 } from "../../utils/date.js";
import { prisma } from "../../utils/prisma.js";
import {
  $ref,
  CreateUserInput,
  DeleteSessionInput,
  FetchAuthenticationProfile,
  FetchGoogleAccountInfo,
  FetchUser,
  GoogleAccount,
  GoogleAccountSchema,
  Session,
  UpdateLastSeen,
  User,
} from "./auth.schema.js";

const getAuthenticationProfile = async (
  data: FetchAuthenticationProfile
): Promise<{ user: User; session: Session }> => {
  try {
    const session = await prisma.session.findFirstOrThrow({ where: data });
    return { user: await getUser({ id: session.userId }), session: session };
  } catch (err) {
    throw new RequestError("Could not find session with given token", 404, err);
  }
};

const createAuthenticationProfile = async (
  data: CreateUserInput
): Promise<{ user: User; session: Session }> => {
  /* If session doesn't exist in DB, fetch google info about token*/
  const rawGoogleAccount = await fetchGoogleAccountInfo({ token: data.token });
  const googleAccount = GoogleAccountSchema.parse({
    ...rawGoogleAccount,
    timeZone: data.timeZone,
  });

  const session = { token: data.token, userId: googleAccount.id };

  /* Create User if doesnt exist, else get existing user data from google account id */
  const userExists = await prisma.user.findFirst({
    where: { id: googleAccount.id },
  });
  const user =
    userExists ||
    (await createUser({ ...googleAccount, timeZone: data.timeZone }));

  /* Create Session attached to the userId */
  await createSession(session);

  return { user: user, session: session };
};

const deleteSession = async (data: DeleteSessionInput) => {
  await prisma.session.delete({
    where: data,
  });
};

const fetchGoogleAccountInfo = async (
  data: FetchGoogleAccountInfo
): Promise<GoogleAccount> => {
  const userDetails = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.token}`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
        Accept: "application/json",
      },
    }
  );

  if (!userDetails.ok) {
    throw new Error("Given token is not linked with any google account.");
  }

  return await userDetails.json();
};

// Create a new user in the database
const createUser = async (input: GoogleAccount): Promise<User> => {
  try {
    return await prisma.user.create({ data: input });
  } catch (err) {
    throw new RequestError("Problem occured while creating user", 500, err);
  }
};

// Create a new session in the database
const createSession = async (input: Session): Promise<Session> => {
  try {
    return await prisma.session.create({ data: input });
  } catch (err) {
    throw new RequestError("Problem occured while creating session", 500, err);
  }
};

// Returns first user from the database / throws an error
const getUser = async (data: FetchUser): Promise<User> => {
  try {
    const user = await prisma.user.findFirstOrThrow({ where: data });
    return user;
  } catch (err) {
    throw new RequestError("Could not find user with given userId", 404, err);
  }
};

const updateLastSeen = async (data: UpdateLastSeen): Promise<User> => {
    try {
        const now = convertToTimeZoneISO8601();
        return await prisma.user.update({
          where: data,
          data: {
            lastSeenAt: now,
          },
        });
    } catch(err) {
        throw new RequestError("Problem occured while updating last seen for user", 500, err);
    };
};

export const authService = {
  createUser,
  createAuthenticationProfile,
  getAuthenticationProfile,
  deleteSession,
  updateLastSeen,
};
