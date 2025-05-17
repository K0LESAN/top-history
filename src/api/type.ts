interface ApiData<T> {
  data: T;
  message: string;
  status_code: number;
}

interface HistoryQueryArgs {
  countryId: number;
  dateFrom: string;
  dateTo: string;
}

export type { ApiData, HistoryQueryArgs };
