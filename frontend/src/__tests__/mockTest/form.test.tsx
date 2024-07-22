import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import AddActivityModal from '@/components/modal/AddActivityModal';
import LIST_CATEGORIES from '@/graphql/category/queries/category.queries';
import { CREATE_ACTIVITY_ENTRY } from '@/graphql/activity-entry/mutations/activity-entry.mutations';
import { GetSumByCategoryDocument } from '@/graphql/generated/schema';
import { LIST_ACTIVITY_ENTRIES } from '@/graphql/activity-entry/queries/activity-entry.queries';

const mocks = [
  {
    request: {
      query: LIST_CATEGORIES,
      variables: {},
    },
    result: {
      data: {
        categories: [
          { id: '1', name: 'Transport' },
          { id: '2', name: 'Alimentation' },
        ],
      },
    },
  },
  {
    request: {
      query: CREATE_ACTIVITY_ENTRY,
      variables: {
        data: {
          name: 'Trajet pour les vacances',
          input: 20,
          spendedAt: '2023-07-16',
          category: { id: 1 },
        },
      },
    },
    result: {
      data: {
        createActivityEntry: {
          id: '1',
          name: 'Trajet pour les vacances',
          input: 20,
          spendedAt: '2023-07-16',
          category: { id: 1, name: 'Transport' },
        },
      },
    },
  },
  {
    request: {
      query: LIST_ACTIVITY_ENTRIES,
      variables: {},
    },
    result: {
      data: {
        activityEntries: [],
      },
    },
  },
  {
    request: {
      query: GetSumByCategoryDocument,
      variables: {},
    },
    result: {
      data: {
        getSumByCategory: [
          { categoryName: 'Transport', sumKgCO2: 100, categoryId: 1 },
          { categoryName: 'Alimentation', sumKgCO2: 50, categoryId: 2 },
        ],
      },
    },
  },
];

afterEach(() => {
  jest.resetAllMocks();
});

describe('AddActivityModal', () => {
  it('renders the form fields correctly', async () => {
    const container = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddActivityModal onClose={() => {}} />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(screen.getByLabelText(/Catégorie/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Nom de l'activité/i)).toBeInTheDocument();
      expect(
        screen.getByLabelText(/Dépense carbone \(en kg\/CO2e\)/i),
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/Date de la dépense/i)).toBeInTheDocument();
      expect(container.baseElement).toMatchSnapshot();
    });
  });
});
