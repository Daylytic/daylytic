import { RequestError } from "utils/error.js";
import { convertToTimeZoneISO8601 } from "../../utils/date.js";
import { prisma } from "../../utils/prisma.js";
import {
  CreateNotificationSubscriptionSchema,
  CreateUserInput,
  CreateUserSchema,
  DeleteSessionInput,
  FetchAuthenticationProfile,
  FetchGoogleAccountInfo,
  FetchUser,
  GoogleAccount,
  GoogleAccountSchema,
  Session,
  UpdateLastSeen,
  UpdateThemeSchema,
  UpdateTimezoneSchema,
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
  try {
    /* If session doesn't exist in DB, fetch google info about token*/
    const rawGoogleAccount = await fetchGoogleAccountInfo({ token: data.token });
    const googleAccount = GoogleAccountSchema.parse({
      ...rawGoogleAccount,
      timeZone: data.timeZone,
      theme: data.theme,
    });

    /* Create User if doesnt exist, else get existing user data from google account id */
    const userExists = await prisma.user.findFirst({
      where: { googleId: googleAccount.id! },
    });
    const user =
      userExists ||
      (await createUser({ ...googleAccount, timeZone: data.timeZone, id: undefined, googleId: googleAccount.id }));

    /* Create Session attached to the userId */
    const session = { token: data.token, userId: user.id };
    await createSession(session);

    return { user: user, session: session };
  } catch (err) {
    throw new RequestError("Problem occured while creating authentication profile", 500, err);
  }
};

const deleteSession = async (data: DeleteSessionInput) => {
  try {
    await prisma.session.delete({
      where: data,
    });
  } catch (err) {
    throw new RequestError("Problem occured while deleting session", 500, err);
  }
};

const fetchGoogleAccountInfo = async (
  data: FetchGoogleAccountInfo
): Promise<GoogleAccount> => {
  try {
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
  } catch (err) {
    throw new RequestError("Problem occured while fetching data about google account", 500, err);
  }
};

// Create a new user in the database
const createUser = async (input: CreateUserSchema): Promise<User> => {
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
  } catch (err) {
    throw new RequestError("Problem occured while updating last seen for user", 500, err);
  };
};

const updateTimezone = async (data: UpdateTimezoneSchema): Promise<User> => {
  try {
    return await prisma.user.update({
      where: { id: data.id },
      data: {
        timeZone: data.timeZone,
      },
    });
  } catch (err) {
    throw new RequestError("Problem occured while updating last seen for user", 500, err);
  };
};

const updateTheme = async (data: UpdateThemeSchema): Promise<User> => {
  try {
    return await prisma.user.update({
      where: { id: data.id },
      data: {
        theme: data.theme,
      },
    });
  } catch (err) {
    throw new RequestError("Problem occured while updating last seen for user", 500, err);
  };
};

const subscribeToNotifications = async (data: CreateNotificationSubscriptionSchema) => {
  try {
    const existingSubscription = await prisma.notificationSubscriptions.findFirst({
      where: {
        userId: data.userId,
        endpoint: data.endpoint,
      },
    });

    if (existingSubscription) {
      return;
    }

    await prisma.notificationSubscriptions.create({
      data: data,
    });
  } catch (err) {
    throw new RequestError("Problem occured while updating last seen for user", 500, err);
  };
};

export const authService = {
  createUser,
  getUser,
  createAuthenticationProfile,
  getAuthenticationProfile,
  deleteSession,
  updateLastSeen,
  updateTimezone,
  updateTheme,
  subscribeToNotifications,
};
