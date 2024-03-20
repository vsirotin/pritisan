import { TestBed } from '@angular/core/testing';

import { TimeSeriesDB } from './time-series-db';

describe('Time Series Db', () => {
  let timeSeriesDB: TimeSeriesDB;

  beforeEach(() => {
    timeSeriesDB = new TimeSeriesDB();
  });

  it('should be created', () => {
    expect(timeSeriesDB).toBeTruthy();
  });
});
