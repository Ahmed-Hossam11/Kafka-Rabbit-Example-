import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import _ from 'lodash';
import { FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { City, CityDocument } from './entities/city.entity';
// import { ToWho, ToWhoDocument } from './entities/to-who.entity';


@Injectable()
export class CityRepository extends BaseAbstractRepository<City> {
    constructor(@InjectModel(City.name) private toWhoModel: Model<CityDocument>)
    {
        super(toWhoModel);
    }
    // //aggrigation 


    // public async findAllWithPagination(
    //     queryFiltersAndOptions: any,
    // ): Promise<ToWhoDocument[]>
    // {
    //     console.log(queryFiltersAndOptions)

    //     let filters: FilterQuery<ToWhoDocument> = _.pick(queryFiltersAndOptions, [
    //         'titleAr',
    //         'titleEn',
    //         'type',
    //     ]);
    //     console.log('here')
    //     const options: PaginateOptions = _.pick(queryFiltersAndOptions, [
    //         'page',
    //         'limit',
    //     ]);
    //     let query: { type?} = {}


    //     if (queryFiltersAndOptions.type)
    //     {
    //         query.type = queryFiltersAndOptions.type
    //         delete filters.type
    //     }

    //     // filters = query
    //     let docs;
    //     console.log(filters)
    //     if (queryFiltersAndOptions.allowPagination)
    //     {
    //         docs = await (this.toWhoModel as PaginateModel<ToWhoDocument>).paginate(
    //             // here we can but any option to to query like sort
    //             {
    //                 filters,
    //                 ...query
    //             },
    //             {
    //                 ...options
    //             }
    //         );
    //     } else
    //     {
    //         docs = await this.toWhoModel.find(filters)
    //     }
    //     return docs;
    // }



}