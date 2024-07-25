import {
  ActivityEntriesQuery,
  CategoriesQuery,
  GetPaginatedPostsQuery,
  GetSumByCategoryQuery,
  GetSumByMonthQuery,
} from '@/graphql/generated/schema';

export type EntryData = ActivityEntriesQuery['activityEntries'][0];

export type Category = CategoriesQuery['categories'][0];

export type SumByCategory = GetSumByCategoryQuery['getSumByCategory'][0];

export type SumByMonth = GetSumByMonthQuery['getSumByMonth'][0];

export type Post = GetPaginatedPostsQuery['getPaginatedPosts'][0];
