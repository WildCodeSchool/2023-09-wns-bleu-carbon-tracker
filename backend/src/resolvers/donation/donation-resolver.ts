import { Resolver, Mutation, Arg, Int, Query } from 'type-graphql';
import Donation from '../../entities/donation/donation';
import UserService from '../../services/user-service';
import { db } from '../../db';

@Resolver(Donation)
export default class DonationResolver {
  @Mutation(() => Donation)
  async createDonation(
    @Arg('userId') userId: string,
    @Arg('amount', () => Int) amount: number,
  ): Promise<Donation> {
    const user = await UserService.readById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const donation = new Donation();
    donation.user = user;
    donation.amount = amount;
    await donation.save();
    return donation;
  }

  @Query(() => Int)
  async getTotalDonations(): Promise<number> {
    const total = await db
      .getRepository(Donation)
      .createQueryBuilder('donation')
      .select('SUM(donation.amount)', 'total')
      .getRawOne();
    return total.total;
  }
}
