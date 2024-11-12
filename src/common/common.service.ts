import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CommonService {

    handleDBExceptions (error: any){

        if(error.code === '23505'){ 
          throw new BadRequestException(error.detail)
        }
        throw new InternalServerErrorException('Please check server logs.')
    }    
}
