import passport from 'passport';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import { pool } from '../config/psql';
import { UserDTO } from '../types/User';
import { logger } from '../config/logger';
import { generateUsername } from '../utils/generateUsername';


const parseToUserDTO = (params:Record<any, any>): UserDTO => {
  const parsed = {
    userId: params.user_id,
    email: params.email,
    userName: params.user_name,
    avatarUrl: params.avatar_url,
    displayName: params.display_name,
    role: params.role,
    bio: params.bio,
    currentRoomId: params.current_room_id,
    lastSeen: params.last_seen,
    createdAt: params.created_at,
  };

  return parsed;
};

const microsoftStrategyMiddleware = new MicrosoftStrategy(
  {
    clientID:
      process.env.NODE_ENV === 'production'
        ? process.env.MICROSOFT_CLIENT_ID_PROD
        : process.env.MICROSOFT_CLIENT_ID,
    clientSecret:
      process.env.NODE_ENV === 'production'
        ? process.env.MICROSOFT_CLIENT_SECRET_PROD
        : process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL:
      process.env.NODE_ENV === 'production'
        ? process.env.MICROSOFT_CALLBACK_URL_PROD
        : process.env.MICROSOFT_CALLBACK_URL,
    scope: ['user.read', 'profile', 'openid'],
  } as any,
  async (accessToken:string, refreshToken:string, profile:any, done:any) => {
    console.log(profile)
    const { rows } = await pool.query(
      `
      SELECT u.*, ap.microsoft_id
      FROM user_data u
      JOIN auth_provider ap ON u.user_id = ap.user_id 
      WHERE ap.microsoft_id = $1 or u.email = $2;
      `,
      [profile.id, profile.emails[0].value]
    );
    logger.info(`user ${rows[0]} authenticated successfully`);
    if (rows.length > 0) {
      logger.info(`user ${profile.emails[0].value} already exists`);
      const parsedUser = parseToUserDTO(rows[0]);
      done(null, parsedUser);
    } else {
      if (profile.emails) {
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          const { rows: userDataRows } = await client.query(
            `
            INSERT INTO user_data (email, user_name, avatar_url, display_name, bio, role, language, microsoft_id)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            `,
            [
              profile.emails[0].value,
              generateUsername(profile.displayName.toLowerCase()), //generate unique handle by default
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7b5Uk6-fslFsGiTi_zqcNqdn9QqIC8AMxw&usqp=CAU',
              profile.displayName,
              '', 
              'student', 
              'english', 
              profile.id,
            ]
          );
          logger.info(`user ${profile.emails[0].value} created successfully`);
          const { rows: authProviderRows } = await client.query(
            `
            INSERT INTO auth_provider (user_id, microsoft_id)
            VALUES ($1, $2)
            RETURNING microsoft_id 
            `,
            [userDataRows[0].user_id, profile.id]
          );

          await client.query('COMMIT');

          const unParsedUserData = {
            ...userDataRows[0],
            microsoft_id: authProviderRows[0].microsoft_id,
          };

          const parsedUserData = parseToUserDTO(unParsedUserData);

          done(null, parsedUserData);
        } catch (err) {
          await client.query('ROLLBACK');
          logger.error(`${err}`);
          throw err;
        } finally {
          client.release();
        }
      }
    }
  }
);

const serializeMiddleware = (user: Partial<UserDTO>, done: any) => {
  done(null, user.userId);
};

const deserializeMiddleware = async (userId: string, done: any) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT u.*, ap.microsoft_id
      FROM user_data u
      JOIN auth_provider ap ON u.user_id = ap.user_id
      WHERE u.user_id = $1;
      `,
      [userId]
    );
    const parsedUserData = parseToUserDTO(rows[0]);
    done(null, parsedUserData);
  } catch (err) {
    logger.error(`${err}`);
    done(err, null);
  }
};

passport.use(microsoftStrategyMiddleware);
passport.serializeUser(serializeMiddleware);
passport.deserializeUser(deserializeMiddleware);
