import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantConfigDto } from './dto/tenant.config.dto';
import { TenantConfig } from './entities/tenant.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(TenantConfig) private readonly configRepository: Repository<TenantConfig>,
  @Inject('MASTER_TENANT_SERVICE') private client: ClientProxy
  ){}

  async setConfig(tenantDetails: TenantConfigDto){
    await this.configRepository.save(tenantDetails);
  }

  async getConfig(tenantId: string){
    await this.configRepository.findOneOrFail({
      where:{
        tenantId: tenantId,
      }
    });
  }
}
