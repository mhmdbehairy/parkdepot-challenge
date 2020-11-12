import { WhitelistSeed } from '../seeds/whitelist.seed';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { UserSeed } from '../seeds/user.seed';

export class SeedUser1605176821608 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    await getRepository('user').save(UserSeed);
    await getRepository('WhiteListItems').save(WhitelistSeed);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
