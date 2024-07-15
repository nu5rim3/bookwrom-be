import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ConfirmSignUpDto,
  ForgotPasswordDto,
  ResendConfirmationCodeDto,
  SignInDto,
  SignUpDto,
  ConfirmForgotPasswordDto,
  ChangePasswordDto,
} from './dto/auth.dto';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'User successfully signed in.' })
  @ApiOperation({ summary: 'Sign in  user.' })
  async signin(@Body() signInDto: SignInDto) {
    this.logger.info('Sign in request received');
    return await this.authService.signIn(signInDto);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'User successfully signed up.' })
  @ApiOperation({ summary: 'Sign up a new user.' })
  async signup(@Body() signUpDto: SignUpDto) {
    this.logger.info('Sign up request received');
    return await this.authService.signUp(signUpDto);
  }

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ConfirmSignUpDto })
  @ApiResponse({ status: 200, description: 'User successfully confirmed.' })
  @ApiOperation({ summary: 'Confirm a user.' })
  async confirm(@Body() confirmSignUpDto: ConfirmSignUpDto) {
    this.logger.info('Confirm request received');
    return await this.authService.confirmSignUp(confirmSignUpDto);
  }

  @Post('resend-code')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ResendConfirmationCodeDto })
  @ApiResponse({ status: 200, description: 'Confirmation code resent.' })
  @ApiOperation({ summary: 'Resend confirmation code.' })
  async resendCode(@Body() confirmSignUpDto: ConfirmSignUpDto) {
    this.logger.info('Resend code request received');
    return await this.authService.resendConfirmationCode(confirmSignUpDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset code sent.' })
  @ApiOperation({ summary: 'Send password reset code.' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    this.logger.info('Forgot password request received');
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('confirm-forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ConfirmForgotPasswordDto })
  @ApiResponse({ status: 200, description: 'Password successfully reset.' })
  @ApiOperation({ summary: 'Reset password.' })
  async confirmForgotPassword(
    @Body() confirmForgotPasswordDto: ConfirmForgotPasswordDto,
  ) {
    this.logger.info('Reset password request received');
    return await this.authService.confirmForgotPassword(
      confirmForgotPasswordDto,
    );
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({ status: 200, description: 'Password successfully changed.' })
  @ApiOperation({ summary: 'Change password.' })
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    this.logger.info('Change password request received');
    return await this.authService.changePassword(changePasswordDto);
  }
}
