import { IsNotEmpty, IsUUID } from 'class-validator';

class AffiliateUserDto {
  @IsNotEmpty({ message: 'User id is required.' })
  @IsUUID('all', { message: 'User id should be a uuid' })
  user_id: string;

  @IsNotEmpty({ message: 'Affiliate id is required.' })
  @IsUUID('all', { message: 'Affiliate id should be a uuid' })
  affiliate_id: string;
}

export { AffiliateUserDto };
