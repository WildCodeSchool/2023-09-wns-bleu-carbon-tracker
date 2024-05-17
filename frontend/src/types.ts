import {
  ActivityEntriesQuery,
  CategoriesQuery,
} from '@/graphql/generated/schema';

export type EntryData = ActivityEntriesQuery['activityEntries'][0];

export type Category = CategoriesQuery['categories'][0];
