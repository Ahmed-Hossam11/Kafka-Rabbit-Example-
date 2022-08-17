import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
// import { PaginationParams } from 'src/utils/;

import { IntersectionType } from '@nestjs/swagger';

export class FilterQueryAbout
{
    // @IsOptional()
    // @Transform(({ obj }) =>
    // {
    //     return new RegExp(escapeRegExp(obj.username), 'i');
    // })
    username?: string;
    //to filter any 
}

export class FilterQueryOptionsAbout extends IntersectionType(
    FilterQueryAbout,
    PaginationParams,
) { }
