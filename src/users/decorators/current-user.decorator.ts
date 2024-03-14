import { ExecutionContext, createParamDecorator } from "@nestjs/common"


export const CurrenUser = createParamDecorator(
    (data:never,context:ExecutionContext)=>{
         const request = context.switchToHttp().getRequest();
         
        return request.currentUser
    }
)