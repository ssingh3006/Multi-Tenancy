import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { TenantConfig } from './entities/tenant.entity';
import { TenantConfigDto } from './dto/tenant.config.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('message_printed')
  getConfigTenantService() {
    return 'Tenant config service created';
  }

  @MessagePattern({cmd: 'set_config'})
  // @EventPattern
  async setConfig(tenantDetails: TenantConfigDto) {
    await this.appService.setConfig(tenantDetails);
  }

  @MessagePattern('get_config')
  async getConfig(tenantId: string) {
    await this.appService.getConfig(tenantId);    
  }
}
