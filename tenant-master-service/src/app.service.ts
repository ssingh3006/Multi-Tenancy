import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TenantDetailsDto } from './dto/tenant.details.dto';

@Injectable()
export class AppService {
  constructor(@Inject('TENANT_CONFIG_SERVICE') private readonly client1: ClientProxy,
    @Inject('TENANT_PROVISION_SERVICE') private readonly client2: ClientProxy) { }

  getHello(): string {
    return 'Hello World!';
  }

  async masterTenantService(tenantDetails: TenantDetailsDto) {
    const message = this.client1.send({ cmd: 'create-database' }, tenantDetails.tenantName);
    let databaseName: string;
    message.subscribe((next) => {
      databaseName = next.database_name;
    });


    const Tenantconfig: TenantDetailsDto = {
      ...tenantDetails,
      tenantDbName: databaseName,
      host: 'localhost',
      port: 3306
    }
    return this.client2.send({ cmd: 'set_config' }, Tenantconfig);
  }
}
