import { Injectable } from '@nestjs/common';
import { CityRepository } from './city.repository';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {

  constructor(private readonly cityRepository: CityRepository) { }
  async  create(createCityDto: CreateCityDto) 
  {
    return await this.cityRepository.create(createCityDto);
  }

  findAll() {
    return `This action returns all city`;
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
