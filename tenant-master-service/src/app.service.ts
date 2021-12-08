import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TenantDetails } from './dto/tenant.details.dto';

@Injectable()
export class AppService {
  constructor( @Inject('TENANT_PROVISION_SERVICE') private readonly client: ClientProxy){}

  getHello(): string {
    return 'Hello World!';
  }

  masterTenantService(tenantDetails:TenantDetails){
    const message = this.client.send({cmd: 'create-database'}, tenantDetails.tenantName);
    let databaseName: string;
    message.subscribe((next) => {
      databaseName = next.database_name;
    });
    const details = {
     ...tenantDetails,
     tenantDbName: '',
     host: '',
     port: ''
    }
    this.client.send({cmd: 'set_config'},details);
  }
}
