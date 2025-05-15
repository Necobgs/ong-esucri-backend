import { IsNotEmpty, MinLength } from "class-validator";

export class CreateNoticeDto {

    @IsNotEmpty()
    @MinLength(5)
    title:string;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    notice_text:string;

}
