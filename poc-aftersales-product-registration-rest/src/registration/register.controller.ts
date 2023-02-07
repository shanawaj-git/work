import {Body, Controller, Post, Query, UsePipes, ValidationPipe} from "@nestjs/common";
import NewRegisterDto from "./dto/newRegister.dto";
import RegisterService from "./register.service";



@Controller('registrations')
export default class RegisterController{
    constructor(private registerTypeService: RegisterService) {}


        @Post()
        async insertData(@Body() registerDto: NewRegisterDto){
                return this.registerTypeService.createNewRegistration(registerDto);

        }


}