import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, EventPattern } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { TenantDetailsDto } from './dto/tenant.details.dto';

@Controller()
export class AppController {
  constructor(@Inject('TENANT_CONFIG_SERVICE') private readonly client: ClientProxy, private readonly appService: AppService) { }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @MessagePattern('message-printed')
  // getMasterTenant() {
  //   const m = this.client.send('message_printed', 'Prajwal tenant config');
  //   m.subscribe((next) => console.log(next));
  //   return 'Tenant master service created';
  // }

  // @EventPattern({ cmd: 'tenant-master-service' })
  @MessagePattern({ cmd: 'tenant-master-service' })
  masterTenantService(tenantDetails: TenantDetailsDto) {
    return this.appService.masterTenantService(tenantDetails);
  }
}
