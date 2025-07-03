import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUser {
    @ApiProperty({
        description: 'The unique identifier of the user',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    readonly id: string;

    @ApiProperty({ description: "User's email address", example: 'john.doe@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'The password for the user', minLength: 8, example: 'mySecurePassword123' })
    @IsString()
    @IsNotEmpty()
    password: string;

}
