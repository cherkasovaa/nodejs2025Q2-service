import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}
