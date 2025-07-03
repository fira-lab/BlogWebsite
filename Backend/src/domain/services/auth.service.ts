import { CreateAuthUserCommand } from '@application/auth/command/create-auth-user.command';
import { DeleteAuthUserCommand } from '@application/auth/command/delete-auth-user.command';
import { LoginAuthDto } from '@application/dto/auth/login-auth.dto';
import { RegisterAuthDto } from '@application/dto/auth/register-auth.dto';
import { Auth } from '@infrastructure/models/auth.model';
import { AuthRepository } from '@infrastructure/repository/auth.repository';
import { ProfileRepository } from '@infrastructure/repository/profile.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { v4 } from 'uuid';
import { LoggerService } from './logger.service';
import { Role } from '@domain/entities/enums/role.enum';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} from '@constants';
import axios from 'axios';
import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import * as path from 'path';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const EMAIL_SENDER = process.env.sent_email || '';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly profileRepository: ProfileRepository,
    private readonly logger: LoggerService,
  ) {
    console.log('AuthService initialized');

    // Initialize nodemailer transporter
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Configure Handlebars for nodemailer
    const handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./views'),
      extName: '.handlebars',
    };
    this.transporter.use('compile', hbs(handlebarOptions));
  }

  async register(
    registerDto: RegisterAuthDto,
  ): Promise<{ message: string; authId: string; profileId: string }> {
    console.log('Starting registration with DTO:', registerDto);
    const authId = 'auth-' + v4();
    const profileId = 'profile-' + v4();
    console.log('Generated authId:', authId, 'profileId:', profileId);

    try {
      await this.commandBus.execute(
        new CreateAuthUserCommand(registerDto, authId, profileId),
      );
      console.log(
        'CreateAuthUserCommand executed successfully for authId:',
        authId,
      );
    } catch (error) {
      console.error('Error executing CreateAuthUserCommand:', error);
      throw error;
    }

    this.logger.logger(`Registration process started for user ${authId}.`, {
      module: 'AuthService',
      method: 'register',
    });
    return { message: 'Registration process started.', authId, profileId };
  }

  async validateUser(email: string, pass: string): Promise<Auth | null> {
    console.log('Validating user with email:', email);
    const auth = await this.authRepository.findByEmail(email, true);
    if (!auth) {
      console.log('User not found for email:', email);
      return null;
    }

    const isPasswordValid = await bcrypt.compare(pass, auth.password);
    console.log(
      'Password validation result for email',
      email,
      ':',
      isPasswordValid,
    );

    if (isPasswordValid) {
      return auth;
    }
    return null;
  }

  async login(loginDto: LoginAuthDto) {
    const { email, password } = loginDto;
    const context = { module: 'AuthService', method: 'login' };
    console.log('Login attempt for email:', email);
    this.logger.logger(`Attempting to log in user ${email}.`, context);

    const auth = await this.authRepository.findByEmail(loginDto.email, true);
    if (!auth) {
      console.log('User not found for email:', email);
      this.logger.warning(`Failed login attempt for user ${email}.`, context);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      auth.password,
    );
    if (!isPasswordValid) {
      console.log('Invalid password for email:', email);
      this.logger.warning(`Failed login attempt for user ${email}.`, context);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: auth.email, sub: auth.id, roles: auth.role };
    console.log('Generating JWT for payload:', payload);

    this.logger.logger(`User ${email} logged in successfully.`, context);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(userId: string): Promise<{ message: string }> {
    console.log('Logging out user with ID:', userId);
    try {
      await this.authRepository.removeRefreshToken(userId);
      console.log('Refresh token removed for userId:', userId);
    } catch (error) {
      console.error('Error removing refresh token for userId:', userId, error);
      throw error;
    }

    this.logger.logger(`User ${userId} logged out successfully.`, {
      module: 'AuthService',
      method: 'logout',
    });
    return { message: 'User logged out successfully.' };
  }

  async refreshToken(user: any) {
    console.log('Refreshing token for user:', user.username);
    const payload = { username: user.username, sub: user.sub };
    console.log('Generating new JWT for payload:', payload);

    this.logger.logger(`Refreshing token for user ${user.username}.`, {
      module: 'AuthService',
      method: 'refreshToken',
    });
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByAuthId(authId: string): Promise<Auth | null> {
    console.log('Finding user by authId:', authId);
    const auth = await this.authRepository.findById(authId);
    if (!auth) {
      console.log('User not found for authId:', authId);
      this.logger.logger(`User ${authId} not found.`, {
        module: 'AuthService',
        method: 'findByAuthId',
      });
      return null;
    }
    console.log('Found user for authId:', authId);
    return auth;
  }

  async initiateGoogleAuth() {
    console.log('Initiating Google OAuth');
    const state = crypto.randomBytes(20).toString('hex');
    const redirectUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(GOOGLE_CALLBACK_URL)}` +
      `&response_type=code` +
      `&scope=openid%20email%20profile` +
      `&access_type=offline` +
      `&state=${state}`;
    console.log('Generated Google OAuth redirect URL:', redirectUrl);
    this.logger.logger(`Initiating Google OAuth.`, {
      module: 'AuthService',
      method: 'initiateGoogleAuth',
    });
    return { redirectUrl, state };
  }

  async handleGoogleRedirect(code: string, state: string, storedState: string) {
    console.log('Handling Google redirect with code:', code, 'state:', state);
    if (!state || state !== storedState) {
      console.log('State mismatch. Provided:', state, 'Stored:', storedState);
      this.logger.logger(`Invalid state or state mismatch.`, {
        module: 'AuthService',
        method: 'handleGoogleRedirect',
      });
      throw new UnauthorizedException('Invalid state or state mismatch.');
    }

    try {
      const tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: GOOGLE_CALLBACK_URL,
          grant_type: 'authorization_code',
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      const { access_token } = tokenResponse.data;
      console.log('Received Google access token:', access_token);

      const userInfoResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      );
      const user = userInfoResponse.data;
      console.log('Received Google user info:', user);

      const jwt = await this.findOrCreateGoogleUser({
        googleId: user.sub,
        email: user.email,
        firstName: user.given_name,
        lastName: user.family_name,
        picture: user.picture,
      });
      console.log('Generated JWT for Google user:', user.email);

      this.logger.logger(`Google user ${user.email} found or created.`, {
        module: 'AuthService',
        method: 'findOrCreateGoogleUser',
      });
      return { access_token: jwt };
    } catch (error) {
      console.error('Error in Google OAuth redirect handling:', error);
      throw error;
    }
  }

  async findOrCreateGoogleUser(profile: any) {
    console.log('Finding or creating Google user with profile:', profile);
    let auth = await this.authRepository.findByGoogleId(profile.googleId);
    console.log('Google ID search result:', auth ? 'Found' : 'Not found');

    if (!auth) {
      auth = await this.authRepository.findByEmail(profile.email);
      console.log('Email search result:', auth ? 'Found' : 'Not found');

      if (auth) {
        auth.googleId = profile.googleId;
        await auth.save();
        console.log('Updated existing user with Google ID:', profile.googleId);
      } else {
        const authId = 'auth-' + v4();
        const profileId = 'profile-' + v4();
        console.log(
          'Creating new user with authId:',
          authId,
          'profileId:',
          profileId,
        );

        const registerDto = {
          name: profile.firstName,
          lastname: profile.lastName,
          email: profile.email,
        };

        auth = await this.authRepository.create({
          id: authId,
          googleId: profile.googleId,
          role: [Role.USER],
        });
        console.log('Created new auth record:', auth);

        await this.profileRepository.create({
          id: profileId,
          authId: authId,
          name: profile.firstName,
          lastname: profile.lastName,
        });
        console.log('Created new profile record for authId:', authId);
      }
    }

    const payload = { email: auth.email, sub: auth.id, roles: auth.role };
    console.log('Generating JWT for payload:', payload);
    return this.jwtService.sign(payload);
  }

  async deleteByAuthId(authId: string): Promise<{ message: string }> {
    console.log('Deleting user with authId:', authId);
    const auth = await this.authRepository.findById(authId);
    const profile = await this.profileRepository.findByAuthId(authId);
    console.log('Auth found:', !!auth, 'Profile found:', !!profile);

    if (!auth || !profile) {
      console.log('User or profile not found for authId:', authId);
      this.logger.logger(`User ${authId} not found.`, {
        module: 'AuthService',
        method: 'deleteByAuthId',
      });
      throw new NotFoundException('User not found');
    }

    try {
      await this.commandBus.execute(
        new DeleteAuthUserCommand(authId, profile.id),
      );
      console.log('DeleteAuthUserCommand executed for authId:', authId);
    } catch (error) {
      console.error('Error executing DeleteAuthUserCommand:', error);
      throw error;
    }

    return { message: 'User deleted successfully for auth id: ' + authId };
  }
}
