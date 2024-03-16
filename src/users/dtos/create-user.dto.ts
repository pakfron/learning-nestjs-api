import { IsEmail, IsNotEmpty, IsString, Min, Max, Matches, MinLength, MaxLength, IsUppercase, IsAlphanumeric} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    // @Matches(/^[a-zA-Z0-9]+$/,{message:'Only letters (a-z, A-Z) and numbers (0-9) are allowed'})
    @MinLength(5,{message:'password not be less than 5'})
    @MaxLength(15,{message:`password not be greater than 15`})
    password:string;
}